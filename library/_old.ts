// import fs from "fs";
// import sass from "node-sass";
// import ts from "typescript";
// import uglifyJs from "uglify-js";

// /**
//  * Compile Sass and save to Css
//  * @param src
//  * @param dest
//  */
// export const compileCssFile = (src: string, dest: string, minify?: boolean) => {
//   const timeStart = Date.now();
//   fs.writeFileSync(
//     dest,
//     sass.renderSync({
//       file: src,
//       outputStyle: minify ? "compressed" : "expanded",
//     }).css
//   );
//   console.log(`Compiling Css took: ${Date.now() - timeStart}ms`);
// };

// /**
//  * Transpile TypeScript and save to JavaScript
//  * @param src
//  * @param dest
//  * @param options
//  */
// export const transpileTsFile = (
//   src: string,
//   dest: string,
//   minify?: boolean
// ) => {
//   const timeStart = Date.now();
//   const srcFile = fs.readFileSync(src).toString().trim();

//   // check if the source file is empty
//   if (srcFile == null || srcFile === "") {
//     return;
//   }

//   const transpiledJs = ts.transpileModule(fs.readFileSync(src).toString(), {})
//     .outputText;

//   fs.writeFileSync(
//     dest,
//     minify ? uglifyJs.minify(transpiledJs).code : transpiledJs
//   );
//   console.log(`Compiling JavaScript took: ${Date.now() - timeStart}ms`);
// };
