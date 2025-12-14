import chalk from "chalk";
import * as z from "zod";
import fs from "fs";

const TestSchema = z.object({
  labels: z.array(z.string()),
  overridePoints: z.number().optional(),
});

const TestsSchema = z.object({
  publicPoints: z.number(),
  hiddenPoints: z.number(),
  publicTests: z.array(TestSchema),
  hiddenTests: z.array(TestSchema),
});

const GroupIdSchema = z.object({
  fileName: z.string(),
  moduleName: z.string(),
  functionName: z.string(),
});

const TestGroupSchema = z.object({
  groupId: GroupIdSchema,
  tests: TestsSchema,
});

const TestDefSchema = z.object({
  id: z.string(),
  exercise: z.string(),
  tests: TestGroupSchema,
});

export type Test = z.infer<typeof TestSchema>;
export type Tests = z.infer<typeof TestsSchema>;
export type GroupId = z.infer<typeof GroupIdSchema>;
export type TestGroup = z.infer<typeof TestGroupSchema>;
export type TestDef = z.infer<typeof TestDefSchema>;

export function loadExercises(path: string): TestDef[] {
  const contents = fs.readFileSync(path, { encoding: "utf-8" });
  const js = JSON.parse(contents);
  const exerciseArray = z.array(TestDefSchema);
  const result = exerciseArray.parse(js);
  return result;
}

export interface TestWithPoints {
  labels: string[];
  points: number;
}

export type MapNode = Map<string, MapNode> | number;

export function genTestTree(
  test: TestWithPoints,
  prevMap: MapNode | undefined
): MapNode {
  if (test.labels.length == 0) {
    throw "Should not happen";
  }
  const current = test.labels[0];
  const tree: MapNode =
    prevMap instanceof Map
      ? prevMap
      : typeof prevMap === "number"
      ? new Map([["", prevMap]])
      : new Map();
  const rest = test.labels.slice(1);
  if (rest.length > 0) {
    const children = genTestTree({ ...test, labels: rest }, tree.get(current));
    tree.set(current, children);
  } else {
    tree.set(current, test.points);
  }
  return tree;
}

function splitTestsWithPoints(tests: Test[], points: number): TestWithPoints[] {
  const overrides = tests.filter((t) => (t.overridePoints ?? 0) > 0);
  if (overrides.length === 0) {
    return tests.map((t) => ({
      labels: t.labels,
      points: points / tests.length,
    }));
  } else if (overrides.length === tests.length) {
    // Needed to avoid a division by 0 below
    return tests.map((t) => ({
      labels: t.labels,
      points: t.overridePoints!,
    }));
  } else {
    const overridePoints = overrides
      .map((p) => p.overridePoints!)
      .reduce((l, r) => l + r);
    if (overridePoints > points) {
      throw "overridePoints can't be more than points!";
    }
    const remainingPoints = points - overridePoints;
    return tests.map((t) => ({
      labels: t.labels,
      points:
        t.overridePoints ?? remainingPoints / (tests.length - overrides.length),
    }));
  }
}

export function addTestsToTestTree(map: MapNode, tests: Tests): MapNode {
  let testsToAdd = splitTestsWithPoints(tests.publicTests, tests.publicPoints);
  if (tests.hiddenPoints > 0 && tests.hiddenTests.length > 0) {
    testsToAdd = [
      ...testsToAdd,
      ...splitTestsWithPoints(tests.hiddenTests, tests.hiddenPoints),
    ];
  }

  return testsToAdd.reduce(addToTestTree, map);
}

export function addToTestTree(map: MapNode, test: TestWithPoints): MapNode {
  return genTestTree(test, map);
}

export function lookupWeight(map: MapNode, label: string[]): number {
  if (typeof map === "number") {
    return map;
  } else {
    if (label.length === 0) {
      throw "Should not happen";
    }
    const submap = map.get(label[0]);
    if (submap === undefined) {
      console.warn(
        chalk.red(
          `Found test with unknown label (tests descriptions should not be changed): ${label}`
        )
      );
      console.log(map);
      return 0;
    }
    return lookupWeight(submap, label.slice(1));
  }
}

export function deserializeMap(obj: any): MapNode {
  if (typeof obj === "number") {
    return obj;
  }
  let map = new Map();
  for (const key in obj) {
    const element = obj[key];
    const value = deserializeMap(element);
    map.set(key, value);
  }
  return map;
}

export function calculateMaxGrade(
  tree: MapNode,
  hiddenOnly: boolean = false,
  currentLabel: string[] = []
): number {
  if (typeof tree === "number") {
    if (hiddenOnly) {
      return [...currentLabel].some((l) => l === "hidden") ? tree : 0;
    } else {
      return tree;
    }
  } else {
    return [...tree.entries()]
      .filter(([k, _]) =>
        hiddenOnly ? true : [...currentLabel, k].every((l) => l != "hidden")
      )
      .reduce<number>(
        (a, [k, v]) =>
          a + calculateMaxGrade(v, hiddenOnly, [...currentLabel, k]),
        0
      );
  }
}
