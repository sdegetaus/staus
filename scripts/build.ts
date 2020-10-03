import * as fs from "fs";
import { minify as htmlMinifier } from "html-minifier";
import * as path from "path";
import * as config from "../config.json";
import * as utils from "./utils";

const timeStart = Date.now();
console.log("Starting build...\n");

const outputPath = path.resolve(`./`, `${config.outDir}`);
const inputPath = path.resolve(`./`, `${config.inDir}`);
const assetsPath = path.join(inputPath, `/assets`);
const staticPath = path.resolve(`./static`);

try {
  // create or clear `outDir` folder
  if (!fs.existsSync(outputPath)) {
    console.log(`Out directory not found! Creating it now: "${outputPath}"`);
    fs.mkdirSync(outputPath);
  } else {
    utils.removeDirContent(outputPath);
  }

  utils.compileCssFile(
    path.join(assetsPath, `/styles/index.scss`),
    path.join(outputPath, `/style.css`)
  );

  utils.transpileTsFile(
    path.join(assetsPath, `/scripts/index.ts`),
    path.join(outputPath, `/main.js`)
  );

  // pages
  fs.readdirSync(path.join(inputPath, `/pages`)).forEach((file) => {
    const filename = utils.getFilename(file);
    import(`../src/pages/${filename}`)
      .then((page) => {
        fs.writeFileSync(
          path.join(outputPath, `/${filename}.html`),
          htmlMinifier(page.default.compile(), {
            collapseWhitespace: config.minify,
            removeComments: config.minify,
          })
        );
      })
      .catch((e) => {
        throw e;
      });
  });

  // copy every file from the `staticPath`
  if (fs.existsSync(staticPath)) {
    fs.readdirSync(staticPath).forEach((file) => {
      const filename = utils.getFilename(file).toLowerCase();
      if (filename === "favicon") {
        // post-process favicon
      }
      fs.copyFileSync(path.join(staticPath, file), path.join(outputPath, file));
    });
  }

  // copy every font from fonts directory
  const inputFontsDir = path.join(assetsPath, "/fonts");
  const outputFontsDir = path.join(outputPath, "/fonts");
  if (fs.existsSync(inputFontsDir)) {
    utils.ensureDirSync(outputFontsDir);
    fs.readdirSync(inputFontsDir).forEach((file) =>
      fs.copyFileSync(
        path.join(inputFontsDir, file),
        path.join(outputFontsDir, file)
      )
    );
  }

  console.log(`\nBuild Successful!`);
} catch (error) {
  console.error(`\nFailed to build. See the console for more info.\n`);
  console.error(error);
} finally {
  console.log(`Build took: ${Date.now() - timeStart}ms\n`);
}
