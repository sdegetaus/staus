import * as fs from "fs";
import { minify as htmlMinifier } from "html-minifier";
import * as sass from "node-sass";
import * as path from "path";
import * as ts from "typescript";
import * as uglifyJs from "uglify-js";
import * as config from "../config.json";

const timeStart = Date.now();
console.log("Starting build...");

const outputPath = path.resolve(`./`, `${config.outDir}`);
const inputPath = path.resolve(`./`, `${config.inDir}`);
const staticPath = path.resolve(`./static`);

try {
  // create or clear `outDir` folder
  if (!fs.existsSync(outputPath)) {
    console.log(
      `Output directory not found! Creating it now...\n${outputPath}`
    );
    fs.mkdirSync(outputPath);
  } else {
    fs.readdirSync(outputPath).forEach((file) =>
      fs.unlinkSync(path.join(outputPath, file))
    );
  }

  buildCss();
  buildJs();

  // pages
  fs.readdirSync(path.join(inputPath, `/pages`)).forEach((file) => {
    const filename = path.basename(file, ".ts");
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
    fs.readdirSync(staticPath).forEach((file) =>
      fs.copyFileSync(path.join(staticPath, file), path.join(outputPath, file))
    );
  }
  console.log(`\nBuild Successful!`);
} catch (error) {
  console.log(`\nFailed to build. See the console for more info.`);
  console.log(error);
} finally {
  console.log(`Build took: ${Date.now() - timeStart}ms\n`);
}

function buildCss() {
  console.log("Building CSS...");
  fs.writeFileSync(
    path.join(outputPath, `/style.css`),
    sass.renderSync({
      file: path.join(inputPath, `/assets/styles/index.scss`),
      outputStyle: config.minify ? "compressed" : "expanded",
    }).css
  );
}

function buildJs() {
  console.log("Building JavaScript...");
  const js = ts.transpileModule(
    fs
      .readFileSync(path.join(inputPath, `/assets/scripts/index.ts`))
      .toString(),
    {}
  ).outputText;
  fs.writeFileSync(
    path.join(outputPath, `/main.js`),
    config.minify ? uglifyJs.minify(js).code : js
  );
}
