import * as fs from "fs";
import { minify as htmlMinifier, Options } from "html-minifier";
import * as path from "path";
import * as config from "../staus-config.json";
import { PATH } from "./consts";
import { LanguageDictionary } from "./classes/page";
import * as utils from "./utils";

export { Layout, Page } from "./classes";

export default abstract class Staus {
  public static build = (language: LanguageDictionary) => {
    const timeStart = Date.now();
    console.log("Starting build...\n");

    const htmlMinifierOptions: Options = {
      collapseWhitespace: true,
      removeComments: config.minify,
      minifyCSS: config.minify,
      minifyJS: config.minify,
      preserveLineBreaks: !config.minify,
    };

    try {
      // create or clear `outDir` folder
      if (!fs.existsSync(PATH.OUTPUT_DIR)) {
        console.log(
          `Out directory not found! Creating it now: "${PATH.OUTPUT_DIR}"`
        );
        fs.mkdirSync(PATH.OUTPUT_DIR);
      } else {
        utils.removeDirContent(PATH.OUTPUT_DIR);
      }

      // TODO: check if paths can be simplified! (and customizable names!)
      // handle non-existing files as well!
      utils.compileCssFile(
        path.join(PATH.ASSETS_DIR, `/styles/index.scss`),
        path.join(PATH.OUTPUT_DIR, `/style.css`)
      );

      utils.transpileTsFile(
        path.join(PATH.ASSETS_DIR, `/scripts/index.ts`),
        path.join(PATH.OUTPUT_DIR, `/main.js`)
      );

      // pages
      fs.readdirSync(PATH.PAGES_DIR).forEach((file) => {
        const extension = path.extname(file);
        const filename = path.basename(file, extension);

        Object.entries(language).forEach(([key, value]) => {
          const languageDir = path.join(
            PATH.OUTPUT_DIR,
            // for the default language, don't make a langDirectory
            `/${key !== config.defaultLanguage ? key : ""}`
          );
          utils.ensureDirSync(languageDir);
          if (extension === ".ts") {
            // TODO: check if path can be simplified!
            import(`../src/pages/${filename}`)
              .then((page) => {
                fs.writeFileSync(
                  path.join(languageDir, `/${filename}.html`),
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

      // copy every file from the `PATH.STATIC_DIR`
      if (fs.existsSync(PATH.STATIC_DIR)) {
        fs.readdirSync(PATH.STATIC_DIR).forEach((file) => {
          const filename = path
            .basename(file, path.extname(file))
            .toLowerCase();
          if (filename === "favicon") {
            // todo: post-process favicon
          }
          fs.copyFileSync(
            path.join(PATH.STATIC_DIR, file),
            path.join(PATH.OUTPUT_DIR, file)
          );
        });
      }

      // TODO: check if paths can be simplified!
      const inputFontsDir = path.join(PATH.ASSETS_DIR, "/fonts");
      const outputFontsDir = path.join(PATH.OUTPUT_DIR, "/fonts");
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
}