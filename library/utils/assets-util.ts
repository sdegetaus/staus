import fs from "fs";
import sass from "node-sass";
import ts from "typescript";
import uglifyJs from "uglify-js";

/**
 * Compile Sass
 */
const compileSassFile = (src: string, minify?: boolean): Buffer => {
  const timeStart = Date.now();
  const css = sass.renderSync({
    file: src,
    outputStyle: minify ? "compressed" : "expanded",
  }).css;
  console.log(`Compiling Sass took: ${Date.now() - timeStart}ms`);
  return css;
};

/**
 * Transpile TypeScript and save to JavaScript
 */
const transpileTsFile = (src: string, minify?: boolean) => {
  const timeStart = Date.now();
  const srcFile = fs.readFileSync(src).toString();
  // check if the source file is empty
  if (srcFile == null || srcFile === "") {
    return;
  }
  const transpiledJs = ts.transpileModule(srcFile, {}).outputText;
  const js = minify ? uglifyJs.minify(transpiledJs).code : transpiledJs;
  console.log(`Compiling TypeScript took: ${Date.now() - timeStart}ms`);
  return js;
};

export default { compileSassFile, transpileTsFile };
