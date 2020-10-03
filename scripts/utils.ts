import * as fs from "fs";
import * as sass from "node-sass";
import * as path from "path";
import * as ts from "typescript";
import * as uglifyJs from "uglify-js";
import * as config from "../config.json";

/**
 * Remove all files and sub-directories in a directory. Adapted from @guybedford's code:
 * https://gist.github.com/liangzan/807712/8fb16263cb39e8472d17aea760b6b1492c465af2#gistcomment-337828
 * @param dirPath
 */
export const removeDirContent = (dirPath: string) => {
  try {
    const files = fs.readdirSync(dirPath);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        var filePath = path.join(dirPath, files[i]);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        } else {
          removeDirContent(filePath);
        }
      }
    }
  } catch (e) {
    throw e;
  }
};

// NOT SURE IF NEEDED!
// export const copyDirContent = (src: string, dest: string) => {
//   if (fs.existsSync(src)) {
//     fs.readdirSync(src).forEach((file) =>
//       fs.copyFileSync(path.join(src, file), path.join(dest, file))
//     );
//   }
// };

/**
 * Create directory if it doesn't exist
 * @param dirPath
 */
export const ensureDirSync = (dirPath: string) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
};

/**
 * Get only the name of a file (i.e. `/path/to/my-file.txt` would return `my-file`)
 * @param file
 */
export const getFilename = (file: string) =>
  path.basename(file, path.extname(file));

/**
 * Compile Sass and save to Css
 * @param src
 * @param dest
 */
export const compileCssFile = (src: string, dest: string) => {
  const timeStart = Date.now();
  fs.writeFileSync(
    dest,
    sass.renderSync({
      file: src,
      outputStyle: config.minify ? "compressed" : "expanded",
    }).css
  );
  console.log(`Compiling Css took: ${Date.now() - timeStart}ms`);
};

/**
 * Transpile TypeScript and save to JavaScript
 * @param src
 * @param dest
 * @param options
 */
export const transpileTsFile = (
  src: string,
  dest: string,
  options: ts.TranspileOptions = {}
) => {
  const timeStart = Date.now();
  const transpiledJs = ts.transpileModule(
    fs.readFileSync(src).toString(),
    options
  ).outputText;
  fs.writeFileSync(
    dest,
    config.minify ? uglifyJs.minify(transpiledJs).code : transpiledJs
  );
  console.log(`Compiling JavaScript took: ${Date.now() - timeStart}ms`);
};
