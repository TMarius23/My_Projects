"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const node_readline_1 = __importDefault(require("node:readline"));
const run_tests_1 = require("./run-tests");
function main() {
    const testResult = (0, run_tests_1.runTest)({ saveJson: true });
    if (testResult.status !== 0 || testResult.stderr.length !== 0) {
        const rl = node_readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        let msg = "";
        if (testResult.error) {
            msg = `Failed to spawn test process: ${testResult.error.message}\nAre you sure you want to submit your assignment? [N/y]\n`;
        }
        else {
            msg = `Test process returned status: ${testResult.status}\nNot all tests passed. Are you sure you want to submit your assignment? [N/y]\n`;
        }
        rl.question(msg, (answer) => {
            if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
                console.log("Ok, zipping files");
                archiveFiles();
            }
            else {
                console.log("Aborting");
                process.exit(0);
            }
            rl.close();
        });
    }
    else {
        console.log(`Test process returned status: ${testResult.status}`);
        archiveFiles();
    }
}
function archiveFiles() {
    const output = fs_1.default.createWriteStream("src.zip");
    const archive = archiver_1.default.create("zip");
    output.on("close", function () {
        console.log("Zipped source files");
        console.log("Size: " + archive.pointer());
    });
    archive.on("error", function (err) {
        throw err;
    });
    archive.pipe(output);
    archive.directory("./src/", "src");
    archive.file("elm.json", { name: "elm.json" });
    archive.file("logs/test-logs.ndjson", { name: "logs/test-logs.ndjson" });
    archive.directory("./tests", "tests");
    archive.finalize();
}
if (typeof require !== "undefined" && require.main === module) {
    main();
}
//# sourceMappingURL=zip-source.js.map