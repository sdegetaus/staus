import fs from "fs";
import path from "path";
import fsPromise from "promise-fs";
import ReactDOMServer from "react-dom/server";
import { INPUT_DIR, OUTPUT_DIR } from "../consts";
import Root from "../parts";
import fsUtil from "../utils/fs-util";
import configUtil from "../utils/config-util";
import Intl from "../intl";

// todo: use this eventually (colored cli)
// https://www.npmjs.com/package/chalk

async function build() {
  const timeStart = Date.now();
  console.log("Starting build...\n");

  try {
    const ROOT = fsUtil.getRootPath();
    const CONFIG = await configUtil.getConfig();
    const PATH = {
      OUTPUT_DIR: path.resolve(ROOT, `${OUTPUT_DIR}`),
      INPUT_DIR: path.resolve(ROOT, `${INPUT_DIR}`),
      STATIC_DIR: path.resolve(ROOT, `./static`),
    };

    // create or clear the build folder
    if (!fs.existsSync(PATH.OUTPUT_DIR)) {
      console.log(
        `Out directory not found! Creating it now: "${PATH.OUTPUT_DIR}"`
      );
      fs.mkdirSync(PATH.OUTPUT_DIR);
    } else {
      fsUtil.removeDirContent(PATH.OUTPUT_DIR);
    }

    // enqueue css & js

    Intl.defaultLocale = CONFIG.defaultLocale; // test

    // build pages
    const pageFiles = await fsPromise.readdir(
      path.join(PATH.INPUT_DIR, "/pages")
    );
    for (const locale of CONFIG.locales) {
      for (const file of pageFiles) {
        const extension = path.extname(file);
        const filename = path.basename(file, extension);
        Intl.activeLocale = locale; // test
        const languageDir = path.join(
          PATH.OUTPUT_DIR,
          // for the default language, don't make a directory
          `/${locale !== CONFIG.defaultLocale ? locale : ""}`
        );
        fsUtil.ensureDirSync(languageDir);
        if (extension === ".tsx") {
          const pagePath = path.join(PATH.INPUT_DIR, `/pages/${filename}`);
          const page = await import(pagePath);

          fs.writeFileSync(
            path.join(languageDir, `/${filename.toLowerCase()}.html`), // todo: translate slug!
            ReactDOMServer.renderToStaticMarkup(Root({ locale, page }))
          );
        }
      }
    }

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
}

build();
export default build;

// TODO: add to build pipeline

// TODO: check if paths can be simplified! (and customizable names!)
// handle non-existing files as well!
// utils.compileCssFile(
//   path.join(Staus.PATH.ASSETS_DIR, `/styles/index.scss`),
//   path.join(Staus.PATH.OUTPUT_DIR, `/style.css`),
//   config.minify
// );

// utils.transpileTsFile(
//   path.join(Staus.PATH.ASSETS_DIR, `/scripts/index.ts`),
//   path.join(Staus.PATH.OUTPUT_DIR, `/main.js`),
//   config.minify
// );

// TODO: check if paths can be simplified!
// const inputFontsDir = path.join(Staus.PATH.ASSETS_DIR, "/fonts");
// const outputFontsDir = path.join(Staus.PATH.OUTPUT_DIR, "/fonts");
// if (fs.existsSync(inputFontsDir)) {
//   utils.ensureDirSync(outputFontsDir);
//   fs.readdirSync(inputFontsDir).forEach((file) =>
//     fs.copyFileSync(
//       path.join(inputFontsDir, file),
//       path.join(outputFontsDir, file)
//     )
//   );
// }
