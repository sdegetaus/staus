import fs from "fs";
import * as cmn from "./common";
import path from "path";

fs.watch(path.resolve(cmn.getRootPath(), "./src"), (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});
