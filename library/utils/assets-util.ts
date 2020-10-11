import fs from "fs";
import sass from "node-sass";
import ts from "typescript";
import uglifyJs from "uglify-js";

/**
 * Compile Sass
 */
const compileSassFile = (src: string, minify?: boolean): Buffer => {
  return sass.renderSync({
    file: src,
    outputStyle: minify ? "compressed" : "expanded",
  }).css;
};

/**
 * Transpile TypeScript and save to JavaScript
 */
const transpileTsFile = (src: string, minify?: boolean) => {
  const srcFile = fs.readFileSync(src).toString();
  if (srcFile) {
    return;
  }
  const transpiledJs = ts.transpileModule(srcFile, {}).outputText;
  return minify ? uglifyJs.minify(transpiledJs).code : transpiledJs;
};

export default { compileSassFile, transpileTsFile };
