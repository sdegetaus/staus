import * as fs from "fs";
import { minify } from "html-minifier";
import * as path from "path";
import * as config from "../config.json";
import * as sass from "node-sass";

const t0 = Date.now();
console.log("Starting build...");

const outputPath = path.resolve(`./`, `${config.outDir}`);
const inputPath = path.resolve(`./`, `${config.inDir}`);
const staticPath = path.resolve(`./static`);

try {
  // create or empty `outDir` folder
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
          minify(page.default.build(), {
            collapseWhitespace: config.minify,
            removeComments: config.minify,
          })
        );
      })
      .catch((e) => {
        throw e;
      });
  });

  if (fs.existsSync(staticPath)) {
    fs.readdirSync(staticPath).forEach((file) => {
      fs.copyFileSync(path.join(staticPath, file), path.join(outputPath, file));
    });
  }
} catch (error) {
  console.log(error);
} finally {
  const t1 = Date.now();
  console.log(`Build took: ${t1 - t0}ms`);
}

function buildCss() {
  fs.writeFileSync(
    path.join(outputPath, `/style.css`),
    sass.renderSync({
      file: path.join(inputPath, `/assets/styles/index.scss`),
      outputStyle: config.minify ? "compressed" : "expanded",
    }).css
  );
}

function buildJs() {
  // need to transform it into es5 js
  fs.writeFileSync(
    path.join(outputPath, `/main.js`),
    fs.readFileSync(path.join(inputPath, `/assets/scripts/index.js`))
  );
}
