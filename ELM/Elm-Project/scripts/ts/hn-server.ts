import express from "express";
import cors from "cors";
import fs from "fs";

function item(req: express.Request, res: express.Response) {
  const resp = JSON.parse(fs.readFileSync("./scripts/data/response.json", { encoding: "utf-8" }));
  const items: [] = resp['items'];
  const story = items.find(post => post['id'] == req.params.id);
  if (story !== undefined) {
    res.status(200).json(story);
  } else {
    res.status(404).end();
  }
}

function topStories(req: express.Request, res: express.Response) {
  const resp = JSON.parse(fs.readFileSync("./scripts/data/response.json", { encoding: "utf-8" }));
  res.status(200).json(resp['topstories']);
}

interface Args {
  slow: boolean;
}

function main(args: Args) {
  const app = express();
  app.use(cors());
  if (args.slow) {
    app.use((req, res, next) => {
      setTimeout(() => {
        next();
      }, 1000);
    });
  }

  const port = 3000;

  app.get("/v0/topstories.json", topStories);
  app.get("/v0/item/:id.json", item);

  const server = app.listen(port, () => {
    console.log(`Starting server on port ${port}`);
    if (args.slow) {
      console.log(`Slow mode ON. Delay: 1 second.`);
    }
  });
}

function parseArgs() {
  const args: Args = {
    slow: ["--slow"].includes(process.argv[2]),
  };
  main(args);
}

if (typeof require !== "undefined" && require.main === module) {
  parseArgs();
}
