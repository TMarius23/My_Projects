import fs from "fs";
import child_process from "child_process";
import chalk from "chalk";

const SEED = "376158560164992";

export function runTest(opts: { saveJson: boolean } = { saveJson: false }) {
  const args = [`--seed ${SEED}`];
  args.push(opts.saveJson ? "--report json" : "--report console");
  const cmd = [
    process.platform == "win32" ? "npx.cmd elm-test" : "npx elm-test",
    ...args,
  ];
  const childOpts = { shell: true };
  const cmdStr = cmd.join(" ");
  const testResult = child_process.spawnSync(cmdStr, childOpts);

  if (!opts.saveJson) {
    console.log("elm-test output:");
    console.log(testResult.stdout.toString("utf-8"));
    console.log(testResult.stderr.toString("utf-8"));
  } else {
    if (!fs.existsSync("./logs")) {
      fs.mkdirSync("./logs");
    }
    fs.writeFileSync("./logs/test-logs.ndjson", testResult.stdout);
    console.log("Saving test results in ./logs/test-logs.ndjson");
    if (testResult.stderr.length !== 0) {
      console.log("There were some errors! See ./logs/test-errs.log");
      fs.writeFileSync("./logs/test-errs.log", testResult.stderr);
    }
  }

  return testResult;
}

function main() {
  console.log("Testing");
  if (process.argv.length > 2) {
    if (process.argv[2] == "--save-json") {
      const res = runTest({ saveJson: true });
      process.exit(res.stderr.length === 0 ? 0 : -1);
    }
  }
  const res = runTest({ saveJson: false });
  process.exit(res.stderr.length === 0 ? 0 : -1);
}

if (typeof require !== "undefined" && require.main === module) {
  main();
}
