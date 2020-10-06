import fs from "fs";
import path from "path";
import * as utils from "../utils";

(async function () {
  const timeStart = Date.now();
  console.log("Starting build...\n");

  try {
    const ROOT = path.resolve(`${process.cwd()}/`);
    const CONFIG = await import(path.join(ROOT, `staus.config.json`)); // todo: defaults
    const PATH = {
      OUTPUT_DIR: path.resolve(ROOT, `${CONFIG.outDir}`),
      INPUT_DIR: path.resolve(ROOT, `${CONFIG.inDir}`),
      STATIC_DIR: path.resolve(ROOT, `./static`),
    };

    // create or clear the build folder
    if (!fs.existsSync(PATH.OUTPUT_DIR)) {
      console.log(
        `Out directory not found! Creating it now: "${PATH.OUTPUT_DIR}"`
      );
      fs.mkdirSync(PATH.OUTPUT_DIR);
    } else {
      utils.removeDirContent(PATH.OUTPUT_DIR);
    }

    // enqueue css & js

    // build pages

    // copy all from the static directory
    if (fs.existsSync(PATH.STATIC_DIR)) {
      fs.readdirSync(PATH.STATIC_DIR).forEach((file) => {
        const filename = path.basename(file, path.extname(file)).toLowerCase();
        if (filename === "favicon") {
          // todo: post-process favicon
        }
        fs.copyFileSync(
          path.join(PATH.STATIC_DIR, file),
          path.join(PATH.OUTPUT_DIR, file)
        );
      });
    }

    // fonts?

    console.log(`\nBuild Successful!`);
  } catch (e) {
    console.error(`\nFailed to build. See the console for more info.\n`);
    console.error(e);
  } finally {
    console.log(`Build took: ${Date.now() - timeStart}ms\n`);
  }
})();
