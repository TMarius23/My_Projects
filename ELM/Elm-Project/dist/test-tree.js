"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMaxGrade = exports.deserializeMap = exports.lookupWeight = exports.addToTestTree = exports.addTestsToTestTree = exports.genTestTree = exports.loadExercises = void 0;
const chalk_1 = __importDefault(require("chalk"));
const z = __importStar(require("zod"));
const fs_1 = __importDefault(require("fs"));
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
function loadExercises(path) {
    const contents = fs_1.default.readFileSync(path, { encoding: "utf-8" });
    const js = JSON.parse(contents);
    const exerciseArray = z.array(TestDefSchema);
    const result = exerciseArray.parse(js);
    return result;
}
exports.loadExercises = loadExercises;
function genTestTree(test, prevMap) {
    if (test.labels.length == 0) {
        throw "Should not happen";
    }
    const current = test.labels[0];
    const tree = prevMap instanceof Map
        ? prevMap
        : typeof prevMap === "number"
            ? new Map([["", prevMap]])
            : new Map();
    const rest = test.labels.slice(1);
    if (rest.length > 0) {
        const children = genTestTree(Object.assign(Object.assign({}, test), { labels: rest }), tree.get(current));
        tree.set(current, children);
    }
    else {
        tree.set(current, test.points);
    }
    return tree;
}
exports.genTestTree = genTestTree;
function splitTestsWithPoints(tests, points) {
    const overrides = tests.filter((t) => { var _a; return ((_a = t.overridePoints) !== null && _a !== void 0 ? _a : 0) > 0; });
    if (overrides.length === 0) {
        return tests.map((t) => ({
            labels: t.labels,
            points: points / tests.length,
        }));
    }
    else if (overrides.length === tests.length) {
        // Needed to avoid a division by 0 below
        return tests.map((t) => ({
            labels: t.labels,
            points: t.overridePoints,
        }));
    }
    else {
        const overridePoints = overrides
            .map((p) => p.overridePoints)
            .reduce((l, r) => l + r);
        if (overridePoints > points) {
            throw "overridePoints can't be more than points!";
        }
        const remainingPoints = points - overridePoints;
        return tests.map((t) => {
            var _a;
            return ({
                labels: t.labels,
                points: (_a = t.overridePoints) !== null && _a !== void 0 ? _a : remainingPoints / (tests.length - overrides.length),
            });
        });
    }
}
function addTestsToTestTree(map, tests) {
    let testsToAdd = splitTestsWithPoints(tests.publicTests, tests.publicPoints);
    if (tests.hiddenPoints > 0 && tests.hiddenTests.length > 0) {
        testsToAdd = [
            ...testsToAdd,
            ...splitTestsWithPoints(tests.hiddenTests, tests.hiddenPoints),
        ];
    }
    return testsToAdd.reduce(addToTestTree, map);
}
exports.addTestsToTestTree = addTestsToTestTree;
function addToTestTree(map, test) {
    return genTestTree(test, map);
}
exports.addToTestTree = addToTestTree;
function lookupWeight(map, label) {
    if (typeof map === "number") {
        return map;
    }
    else {
        if (label.length === 0) {
            throw "Should not happen";
        }
        const submap = map.get(label[0]);
        if (submap === undefined) {
            console.warn(chalk_1.default.red(`Found test with unknown label (tests descriptions should not be changed): ${label}`));
            console.log(map);
            return 0;
        }
        return lookupWeight(submap, label.slice(1));
    }
}
exports.lookupWeight = lookupWeight;
function deserializeMap(obj) {
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
exports.deserializeMap = deserializeMap;
function calculateMaxGrade(tree, hiddenOnly = false, currentLabel = []) {
    if (typeof tree === "number") {
        if (hiddenOnly) {
            return [...currentLabel].some((l) => l === "hidden") ? tree : 0;
        }
        else {
            return tree;
        }
    }
    else {
        return [...tree.entries()]
            .filter(([k, _]) => hiddenOnly ? true : [...currentLabel, k].every((l) => l != "hidden"))
            .reduce((a, [k, v]) => a + calculateMaxGrade(v, hiddenOnly, [...currentLabel, k]), 0);
    }
}
exports.calculateMaxGrade = calculateMaxGrade;
//# sourceMappingURL=test-tree.js.map