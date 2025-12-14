"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTests = exports.parseTest = void 0;
const fs_1 = __importDefault(require("fs"));
function parseTest(raw) {
    function inner(t) {
        if (t.labels[0].includes("VerifyExamples")) {
            let labels = t.labels[0].split(".").slice(0, -1);
            const tagRe = /\{- (?<tag>\w+) -\}/g;
            const testDesc = t.labels[1].replace(tagRe, "").replace(/\s+/g, " ");
            var i = testDesc.indexOf(":");
            labels.push(testDesc.slice(0, i).trim(), testDesc.slice(i + 1).trim());
            const res = tagRe.exec(t.labels[1]);
            const tag = res !== null ? res.groups["tag"] : "public";
            if (tag !== "hidden" && tag !== "public" && tag !== "ignore") {
                throw "Invalid tag";
            }
            return Object.assign(Object.assign({}, t), { labels, visibility: tag, type: "example" });
        }
        else if (t.labels[0].startsWith("Hidden.")) {
            if (t.labels[1] !== "hidden") {
                throw "Hidden tests must start with label 'hidden'";
            }
            const labels = [t.labels[0].replace("Hidden.", ""), ...t.labels.slice(2)];
            return Object.assign(Object.assign({}, t), { labels, visibility: "hidden", type: "test" });
        }
        else {
            return Object.assign(Object.assign({}, t), { type: "test", visibility: "public" });
        }
    }
    const parsed = inner(raw);
    if (parsed.type !== "example" && parsed.labels.length != 4) {
        throw `Invalid test label: ${parsed.labels}`;
    }
    return parsed;
}
exports.parseTest = parseTest;
function loadTests(path, includeExamples = false) {
    const content = fs_1.default.readFileSync(path, "utf-8");
    const lines = content.split("\n");
    const parsed = lines
        .filter((line) => line.length !== 0)
        .map((line) => JSON.parse(line));
    const runStart = parsed[0];
    const runEnd = parsed[parsed.length - 1];
    const testEvents = parsed.slice(1, -1);
    const tests = testEvents
        .map(parseTest)
        .filter((t) => t.type !== "example")
        .filter((t) => t.visibility !== "ignore");
    const hiddenTests = tests.filter((t) => t.visibility === "hidden");
    const publicTests = tests.filter((t) => t.visibility !== "hidden");
    return { publicTests, hiddenTests };
}
exports.loadTests = loadTests;
// function parseTest(t: RawParsedTest): TestData {
//   if (t.labels[0].includes("VerifyExamples")) {
//     let labels = t.labels[0].split(".").slice(0, -1);
//     const tagRe = /\{- (?<tag>\w+) -\}/g;
//     const res = tagRe.exec(t.labels[1]);
//     if (res !== null) {
//       const tag = res.groups["tag"];
//       labels.push(tag);
//     }
//     const testDesc = t.labels[1].replace(tagRe, "").replace(/\s+/g, " ");
//     let i = testDesc.indexOf(":");
//     labels.push(testDesc.slice(0, i).trim(), testDesc.slice(i + 1).trim());
//     return { ...t, labels };
//   } else if (t.labels[0].startsWith("Hidden.")) {
//     const labels = [t.labels[0].replace("Hidden.", ""), ...t.labels.slice(1)];
//     return { ...t, labels };
//   } else {
//     return { ...t, type: "test", visibility: "public" };
//   }
// }
//# sourceMappingURL=test-data.js.map