import fs from "fs";
import path from "path";
import fsUtil from "../utils/fs-util";
import build from "./build";

const watcher = fs.watch(path.resolve(fsUtil.getRootPath(), "./src"), {
  recursive: true,
});

watcher.on("change", async (event, file) => {
  await build();
});
