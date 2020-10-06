import fs from "fs";
import sass from "node-sass";
import path from "path";
import ts from "typescript";
import uglifyJs from "uglify-js";

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

/**
 * Synchronously create directory if it doesn't exist
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
 * Compile Sass and save to Css
 * @param src
 * @param dest
 */
export const compileCssFile = (src: string, dest: string, minify?: boolean) => {
  const timeStart = Date.now();
  fs.writeFileSync(
    dest,
    sass.renderSync({
      file: src,
      outputStyle: minify ? "compressed" : "expanded",
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
  minify?: boolean
) => {
  const timeStart = Date.now();
  const srcFile = fs.readFileSync(src).toString().trim();

  // check if the source file is empty
  if (srcFile == null || srcFile === "") {
    return;
  }

  const transpiledJs = ts.transpileModule(fs.readFileSync(src).toString(), {})
    .outputText;

  fs.writeFileSync(
    dest,
    minify ? uglifyJs.minify(transpiledJs).code : transpiledJs
  );
  console.log(`Compiling JavaScript took: ${Date.now() - timeStart}ms`);
};

/**
 * Get the root path
 * https://stackoverflow.com/a/57102773
 */
export const getRootPath = () => {
  const fullPath = path.dirname(require.main.filename);
  const regexResp = /^(.*?)library/.exec(fullPath);
  return regexResp ? regexResp[1] : fullPath;
};
