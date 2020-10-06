import fs from "fs";
import path from "path";
import * as utils from "../utils";

fs.watch(path.resolve(utils.getRootPath(), "./src"), (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});
