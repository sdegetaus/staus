import fs from "fs";
import path from "path";
import fsPromise from "promise-fs";
import ReactDOMServer from "react-dom/server";
import { INPUT_DIR, OUTPUT_DIR } from "../consts";
import Intl from "../intl";
import Root from "../parts";
import assetsUtil from "../utils/assets-util";
import configUtil from "../utils/config-util";
import fsUtil from "../utils/fs-util";
import { minify as htmlMinifier } from "html-minifier";
import { html_beautify } from "js-beautify";

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

    // enqueue stylesheets
    fs.writeFileSync(
      path.join(PATH.OUTPUT_DIR, `/${CONFIG.stylesheetName}.css`),
      CONFIG.enqueueStyles.reduce(
        (prev, curr) =>
          prev.concat(
            assetsUtil
              .compileCssFile(path.join(PATH.INPUT_DIR, curr), CONFIG.minify)
              .toString()
          ),
        ""
      ),
      { encoding: "utf-8" }
    );

    // enqueue js
    // TODO!

    Intl.defaultLocale = CONFIG.defaultLocale;

    // build pages
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
          const stylesheetName = CONFIG.stylesheetName;
          const html = ReactDOMServer.renderToStaticMarkup(
            Root({ locale, page, stylesheetName })
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

    // copy all from the static directory
    if (fs.existsSync(PATH.STATIC_DIR)) {
      fsUtil.copyAll(PATH.STATIC_DIR, PATH.OUTPUT_DIR);
    }

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
