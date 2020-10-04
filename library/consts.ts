import * as path from "path";
import * as config from "../config.json";

export const ID = {
  head: "head",
  body: "body",
  content: "content",
};

export const PATH = {
  OUTPUT_DIR: path.resolve(`./`, `${config.outDir}`),
  INPUT_DIR: path.resolve(`./`, `${config.inDir}`),
  STATIC_DIR: path.resolve(`./static`),
  ASSETS_DIR: path.resolve(`./`, `${config.inDir}/assets`),
  PAGES_DIR: path.resolve(`./`, `${config.inDir}/pages`),
};
