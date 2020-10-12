import fs from "fs";
import { minify as htmlMinifier } from "html-minifier";
import { html_beautify } from "js-beautify";
import path from "path";
import fsPromise from "promise-fs";
import ReactDOMServer from "react-dom/server";
import { INPUT_DIR, OUTPUT_DIR, STATIC_DIR } from "./consts";
import Intl from "./intl";
import Root from "./parts";
import SEO from "./seo";
import assetsUtil from "./utils/assets-util";
import { BuildConfig } from "./utils/config-util";
import fsUtil from "./utils/fs-util";

// todo: use this eventually (colored cli)
// https://www.npmjs.com/package/chalk

export default async function build(config: BuildConfig) {
  const timeStart = Date.now();
  console.log("Starting build...\n");

  try {
    const ROOT = fsUtil.getRootPath();
    const PATH = {
      OUTPUT_DIR: path.resolve(ROOT, OUTPUT_DIR),
      INPUT_DIR: path.resolve(ROOT, INPUT_DIR),
      STATIC_DIR: path.resolve(ROOT, STATIC_DIR),
    };
    const FLAGS = {
      enqueueStyles: false,
      enqueueHeadScripts: false,
      enqueueBodyScripts: false,
    };

    clearOutputDirectory(PATH.OUTPUT_DIR);

    Intl.defaultLocale = config.defaultLocale;

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
    if (config.styles.files.length > 0) {
      const mergedCss = config.styles.files.reduce((prev, curr) => {
        const src = path.join(PATH.INPUT_DIR, curr);
        if (fs.existsSync(src)) {
          return prev.concat(
            assetsUtil.compileSassFile(src, config.minify).toString()
          );
        } else {
          return prev;
        }
      }, "");
      if (mergedCss) {
        fs.writeFileSync(
          path.join(PATH.OUTPUT_DIR, `/${config.styles.name}.css`),
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
    [config.headScripts, config.bodyScripts].forEach((script) => {
      if (script.files.length > 0) {
        const mergedJs = script.files.reduce((prev, curr) => {
          const src = path.join(PATH.INPUT_DIR, curr);
          if (fs.existsSync(src)) {
            return prev.concat(
              assetsUtil.transpileTsFile(src, config.minify).toString()
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
            case config.headScripts:
              FLAGS.enqueueHeadScripts = true;
              break;
            case config.bodyScripts:
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
    for (const locale of config.locales) {
      Intl.activeLocale = locale;
      for (const file of pageFiles) {
        const extension = path.extname(file);
        const filename = path.basename(file, extension);
        const languageDir = path.join(
          PATH.OUTPUT_DIR,
          // for the default language, don't make a directory
          `/${locale !== config.defaultLocale ? locale : ""}`
        );
        fsUtil.ensureDirSync(languageDir);
        if (extension === ".tsx") {
          const pagePath = path.join(PATH.INPUT_DIR, `/pages/${filename}`);
          const page = await import(pagePath);
          const stylesName = FLAGS.enqueueStyles ? config.styles.name : null;
          const headScriptsName = FLAGS.enqueueHeadScripts
            ? config.headScripts.name
            : null;
          const bodyScriptsName = FLAGS.enqueueBodyScripts
            ? config.bodyScripts.name
            : null;
          const pageId = filename.toLowerCase();
          const html = ReactDOMServer.renderToStaticMarkup(
            Root({
              locale,
              pageId,
              page,
              stylesName,
              headScriptsName,
              bodyScriptsName,
            })
          );
          const processedHtml = config.minify
            ? htmlMinifier(html)
            : html_beautify(html);
          const translatedSlug = SEO.slug == null ? pageId : SEO.slug;
          fs.writeFileSync(
            path.join(languageDir, `/${translatedSlug}.html`),
            processedHtml
          );
          SEO.clearPage();
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

export const clearOutputDirectory = (outputDir: string) => {
  if (!fs.existsSync(outputDir)) {
    console.log(`Out directory not found! Creating it now: "${outputDir}"`);
    fs.mkdirSync(outputDir);
  } else {
    fsUtil.removeDirContent(outputDir);
  }
};
