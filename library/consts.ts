import * as path from "path";
import * as config from "../config.json";

export const ID = {
  head: "head",
  body: "body",
  layout: "layout",
  header: "header",
  content: "content",
  footer: "footer",
};

export const PATH = {
  OUTPUT_DIR: path.resolve(`./`, `${config.outDir}`),
  INPUT_DIR: path.resolve(`./`, `${config.inDir}`),
  ASSETS_DIR: path.resolve(`./`, `${config.inDir}/assets`),
  STATIC_DIR: path.resolve(`./static`),
};
