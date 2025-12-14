"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const run_tests_1 = require("./run-tests");
const chalk_1 = __importDefault(require("chalk"));
const test_data_1 = require("./test-data");
const test_tree_1 = require("./test-tree");
function grade() {
    console.log("Running tests...");
    const res = (0, run_tests_1.runTest)({ saveJson: true });
    if (res.stderr.length != 0) {
        console.warn(chalk_1.default.red("Can't calculate grade as there were some errors"));
        return {
            result: "err",
            message: "Can't calculate grade as there were some errors",
        };
    }
    const { publicTests: tests } = (0, test_data_1.loadTests)("./logs/test-logs.ndjson");
    const weights = (0, test_tree_1.deserializeMap)(JSON.parse(fs_1.default.readFileSync("./scripts/weights.json", { encoding: "utf-8" })));
    const unroundedGrade = tests
        .filter((t) => t.status === "pass")
        .reduce((s, test) => s + (0, test_tree_1.lookupWeight)(weights, test.labels), 0);
    const maxGrade = Math.ceil((0, test_tree_1.calculateMaxGrade)(weights));
    const grade = Math.ceil(unroundedGrade);
    return { result: "ok", maxGrade, grade };
}
function main() {
    const result = grade();
    if (result.result == "ok") {
        console.log(chalk_1.default.green(`Final grade (for public, automatic tests): ${result.grade}/${result.maxGrade}`));
    }
}
if (typeof require !== "undefined" && require.main === module) {
    main();
}
//# sourceMappingURL=calculate-grade.js.map