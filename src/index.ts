import Staus from "staus";
import { intlData } from "./intl";

Staus.build(intlData, {
  outDir: "./build",
  inDir: "./src",
  minify: true,
  defaultLanguage: "en",
});
