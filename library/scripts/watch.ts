import fs from "fs";
import path from "path";
import fsUtil from "../utils/fs-util";

// TODO!
fs.watch(path.resolve(fsUtil.getRootPath(), "./src"), (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});
