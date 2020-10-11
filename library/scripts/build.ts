import fs from "fs";
import { minify as htmlMinifier } from "html-minifier";
import { html_beautify } from "js-beautify";
import path from "path";
import fsPromise from "promise-fs";
import ReactDOMServer from "react-dom/server";
import { INPUT_DIR, OUTPUT_DIR } from "../consts";
import Intl from "../intl";
import Root from "../parts";
import assetsUtil from "../utils/assets-util";
import configUtil from "../utils/config-util";
import fsUtil from "../utils/fs-util";

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
    const FLAGS = {
      enqueueStyles: false,
      enqueueHeadScripts: false,
      enqueueBodyScripts: false,
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

    Intl.defaultLocale = CONFIG.defaultLocale;

    /**
      Steps:
        1. Transpile & write styles
        2. Transpile & write scripts
        3. Build pages
        4. Copy the static directory
    */

    //#region [1. Transpile & write styles]
    // ------------------------------------
    const t_Sass = Date.now();
    if (CONFIG.styles.files.length > 0) {
      const mergedCss = CONFIG.styles.files.reduce((prev, curr) => {
        const src = path.join(PATH.INPUT_DIR, curr);
        if (fs.existsSync(src)) {
          return prev.concat(
            assetsUtil.compileSassFile(src, CONFIG.minify).toString()
          );
        } else {
          return prev;
        }
      }, "");
      if (mergedCss) {
        fs.writeFileSync(
          path.join(PATH.OUTPUT_DIR, `/${CONFIG.styles.name}.css`),
          mergedCss
        );
        FLAGS.enqueueStyles = true;
      }
    }
    console.log(`Compiling Sass took: ${Date.now() - t_Sass}ms`);
    //#endregion

    //#region [2. Transpile & write scripts]
    // ------------------------------------
    const t_Ts = Date.now();
    [CONFIG.headScripts, CONFIG.bodyScripts].forEach((script) => {
      if (script.files.length > 0) {
        const mergedJs = script.files.reduce((prev, curr) => {
          const src = path.join(PATH.INPUT_DIR, curr);
          if (fs.existsSync(src)) {
            return prev.concat(
              assetsUtil.transpileTsFile(src, CONFIG.minify).toString()
            );
          } else {
            return prev;
          }
        }, "");
        if (mergedJs) {
          fs.writeFileSync(
            path.join(PATH.OUTPUT_DIR, `/${script.name}.js`),
            mergedJs
          );
          switch (script) {
            case CONFIG.headScripts:
              FLAGS.enqueueHeadScripts = true;
              break;
            case CONFIG.bodyScripts:
              FLAGS.enqueueBodyScripts = true;
              break;
            default:
              throw new Error(`Invalid script: "${JSON.stringify(script)}"`);
          }
        }
      }
    });
    console.log(`Compiling TypeScript took: ${Date.now() - t_Ts}ms`);
    //#endregion

    //#region [3. Build pages]
    // ------------------------------------
    const t_Pages = Date.now();
    const pageFiles = await fsPromise.readdir(
      path.join(PATH.INPUT_DIR, "/pages")
    );
    for (const locale of CONFIG.locales) {
      Intl.activeLocale = locale;
      for (const file of pageFiles) {
        const extension = path.extname(file);
        const filename = path.basename(file, extension);
        const languageDir = path.join(
          PATH.OUTPUT_DIR,
          // for the default language, don't make a directory
          `/${locale !== CONFIG.defaultLocale ? locale : ""}`
        );
        fsUtil.ensureDirSync(languageDir);
        if (extension === ".tsx") {
          const pagePath = path.join(PATH.INPUT_DIR, `/pages/${filename}`);
          const page = await import(pagePath);
          const stylesName = FLAGS.enqueueStyles ? CONFIG.styles.name : null;
          const headScriptsName = FLAGS.enqueueHeadScripts
            ? CONFIG.headScripts.name
            : null;
          const bodyScriptsName = FLAGS.enqueueBodyScripts
            ? CONFIG.bodyScripts.name
            : null;
          const html = ReactDOMServer.renderToStaticMarkup(
            Root({ locale, page, stylesName, headScriptsName, bodyScriptsName })
          );
          const processedHtml = CONFIG.minify
            ? htmlMinifier(html)
            : html_beautify(html);
          fs.writeFileSync(
            path.join(languageDir, `/${filename.toLowerCase()}.html`), // todo: translate slug!
            processedHtml
          );
        }
      }
    }
    console.log(`Building pages took: ${Date.now() - t_Pages}ms`);
    //#endregion

    //#region [4. Copy the static directory]
    if (fs.existsSync(PATH.STATIC_DIR)) {
      fsUtil.copyAll(PATH.STATIC_DIR, PATH.OUTPUT_DIR);
    }
    //#endregion

    console.log(`\nBuild Successful!`);
  } catch (e) {
    console.error(`\nFailed to build. See the console for more info.\n`);
    console.error(e);
  } finally {
    console.log(`Build took: ${Date.now() - timeStart}ms\n`);
  }
}

build();
console.log("this gets called?");
export default build;
