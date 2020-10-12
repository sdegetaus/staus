import fs from "fs";
import path from "path";
import { clearOutputDirectory } from "./build";
import { OUTPUT_DIR } from "./consts";
import fsUtil from "./utils/fs-util";

test("Clear output directory", () => {
  const outputDir = path.resolve(fsUtil.getRootPath(), OUTPUT_DIR);
  clearOutputDirectory(outputDir);
  const exists = fs.existsSync(outputDir);
  expect(exists).toBe(true);
  const isEmpty = fs.readdirSync(outputDir).length === 0;
  expect(isEmpty).toBe(true);
});
