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
  console.log(`Compiling Css took: ${Date.now() - timeStart}ms`);
  return css;
};

/**
 * Transpile TypeScript and save to JavaScript
 */
const transpileTsFile = (src: string, dest: string, minify?: boolean) => {
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

export default { compileCssFile: compileSassFile, transpileTsFile };
