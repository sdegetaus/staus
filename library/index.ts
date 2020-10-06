import fs from "fs";
import { minify as htmlMinifier, Options } from "html-minifier";
import path from "path";
import { IntlData } from "./types";
import * as utils from "./utils";

type Config = {
  outDir: string;
  inDir: string;
  minify: boolean;
  defaultLanguage: string;
};

export default abstract class Staus {
  public static CONFIG: Config;
  public static PATH: { [key: string]: string };
  private static INTL_DATA: IntlData = null;

  public static setIntlData = (data: IntlData) => {
    if (Staus.INTL_DATA === null) {
      Staus.INTL_DATA = data;
    }
  };

  public static build = (config: Config) => {
    const timeStart = Date.now();
    console.log("Starting build...\n");

    Staus.CONFIG = config;
    Staus.PATH = {
      STAUS_DIR: __dirname,
      OUTPUT_DIR: path.resolve(`./`, `${Staus.CONFIG.outDir}`),
      INPUT_DIR: path.resolve(`./`, `${Staus.CONFIG.inDir}`),
      STATIC_DIR: path.resolve(`./static`),
      ASSETS_DIR: path.resolve(`./`, `${Staus.CONFIG.inDir}/assets`),
      PAGES_DIR: path.resolve(`./`, `${Staus.CONFIG.inDir}/pages`),
    };

    const htmlMinifierOptions: Options = {
      collapseWhitespace: true,
      removeComments: config.minify,
      minifyCSS: config.minify,
      minifyJS: config.minify,
      preserveLineBreaks: !config.minify,
    };

    try {
      // create or clear `outDir` folder
      if (!fs.existsSync(Staus.PATH.OUTPUT_DIR)) {
        console.log(
          `Out directory not found! Creating it now: "${Staus.PATH.OUTPUT_DIR}"`
        );
        fs.mkdirSync(Staus.PATH.OUTPUT_DIR);
      } else {
        utils.removeDirContent(Staus.PATH.OUTPUT_DIR);
      }

      // TODO: check if paths can be simplified! (and customizable names!)
      // handle non-existing files as well!
      utils.compileCssFile(
        path.join(Staus.PATH.ASSETS_DIR, `/styles/index.scss`),
        path.join(Staus.PATH.OUTPUT_DIR, `/style.css`),
        config.minify
      );

      utils.transpileTsFile(
        path.join(Staus.PATH.ASSETS_DIR, `/scripts/index.ts`),
        path.join(Staus.PATH.OUTPUT_DIR, `/main.js`),
        config.minify
      );

      // pages
      fs.readdirSync(Staus.PATH.PAGES_DIR).forEach((file) => {
        const extension = path.extname(file);
        const filename = path.basename(file, extension);

        if (Staus.INTL_DATA === null) {
          throw new Error("No intlData set");
        }

        Object.entries(Staus.INTL_DATA).forEach(([key, value]) => {
          const languageDir = path.join(
            Staus.PATH.OUTPUT_DIR,
            // for the default language, don't make a directory
            `/${key !== config.defaultLanguage ? key : ""}`
          );
          utils.ensureDirSync(languageDir);
          if (extension === ".tsx") {
            // TODO: check if path can be optimized!
            import(`../src/pages/${filename}`)
              .then((page) => {
                fs.writeFileSync(
                  path.join(languageDir, `/${filename.toLowerCase()}.html`), // todo: translate slug!
                  htmlMinifier(
                    page.default.compile(key, value.messages),
                    htmlMinifierOptions
                  )
                );
              })
              .catch((e) => {
                throw e;
              });
          }
        });
      });

      // copy every file from the static directory
      if (fs.existsSync(Staus.PATH.STATIC_DIR)) {
        fs.readdirSync(Staus.PATH.STATIC_DIR).forEach((file) => {
          const filename = path
            .basename(file, path.extname(file))
            .toLowerCase();
          if (filename === "favicon") {
            // todo: post-process favicon
          }
          fs.copyFileSync(
            path.join(Staus.PATH.STATIC_DIR, file),
            path.join(Staus.PATH.OUTPUT_DIR, file)
          );
        });
      }

      // TODO: check if paths can be simplified!
      const inputFontsDir = path.join(Staus.PATH.ASSETS_DIR, "/fonts");
      const outputFontsDir = path.join(Staus.PATH.OUTPUT_DIR, "/fonts");
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
  };

  // todo: is this good, nice?
  public static translate = (id: string, locale: string) => {
    const res = Staus.INTL_DATA[locale].messages[id];
    if (res == null) {
      return id;
    }
    return res;
  };
}

// exports
export { Link } from "./components";
export { default as Page } from "./page";
export { IntlData, MessagePair } from "./types";
