import fs from "fs";
import path from "path";
import build from "../build";
import configUtil from "../utils/config-util";
import fsUtil from "../utils/fs-util";

const watcher = fs.watch(path.resolve(fsUtil.getRootPath(), "./src"), {
  recursive: true,
});

watcher.on("change", async (event, filename) => {
  console.log(event, filename);
  if (filename && event === "change") {
    const CONFIG = await configUtil.getConfig();
    await build(CONFIG);
  }
});
