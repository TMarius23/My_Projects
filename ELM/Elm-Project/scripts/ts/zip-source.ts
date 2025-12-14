import fs from "fs";
import archiver from "archiver";
import readline from "node:readline";
import { runTest } from "./run-tests";

function main() {
  const testResult = runTest({ saveJson: true });
  if (testResult.status !== 0 || testResult.stderr.length !== 0) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let msg = "";
    if (testResult.error) {
      msg = `Failed to spawn test process: ${testResult.error.message}\nAre you sure you want to submit your assignment? [N/y]\n`;
    } else {
      msg = `Test process returned status: ${testResult.status}\nNot all tests passed. Are you sure you want to submit your assignment? [N/y]\n`;
    }

    rl.question(msg, (answer) => {
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        console.log("Ok, zipping files");
        archiveFiles();
      } else {
        console.log("Aborting");
        process.exit(0);
      }
      rl.close();
    });
  } else {
    console.log(`Test process returned status: ${testResult.status}`);
    archiveFiles();
  }
}

function archiveFiles() {
  const output = fs.createWriteStream("src.zip");
  const archive = archiver.create("zip");

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
