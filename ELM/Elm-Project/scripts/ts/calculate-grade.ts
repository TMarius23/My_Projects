import fs from "fs";
import { runTest } from "./run-tests";
import chalk from "chalk";
import { loadTests } from "./test-data";
import { lookupWeight, deserializeMap, calculateMaxGrade } from "./test-tree";

interface ObtainedGrade {
  result: "ok";
  maxGrade: number;
  grade: number;
}

interface GradingError {
  result: "err";
  message: string;
}

type GradingResult = ObtainedGrade | GradingError;

function grade(): GradingResult {
  console.log("Running tests...");
  const res = runTest({ saveJson: true });
  if (res.stderr.length != 0) {
    console.warn(chalk.red("Can't calculate grade as there were some errors"));
    return {
      result: "err",
      message: "Can't calculate grade as there were some errors",
    };
  }

  const { publicTests: tests } = loadTests("./logs/test-logs.ndjson");

  const weights = deserializeMap(
    JSON.parse(fs.readFileSync("./scripts/weights.json", { encoding: "utf-8" }))
  );
  const unroundedGrade = tests
    .filter((t) => t.status === "pass")
    .reduce((s, test) => s + lookupWeight(weights, test.labels), 0);
  const maxGrade = Math.ceil(calculateMaxGrade(weights));
  const grade = Math.ceil(unroundedGrade);
  return { result: "ok", maxGrade, grade };
}

function main() {
  const result = grade();
  if (result.result == "ok") {
    console.log(
      chalk.green(
        `Final grade (for public, automatic tests): ${result.grade}/${result.maxGrade}`
      )
    );
  }
}

if (typeof require !== "undefined" && require.main === module) {
  main();
}
