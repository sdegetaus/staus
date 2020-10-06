import Staus from "staus";
import { intlData } from "./intl";

Staus.setIntlData(intlData);

Staus.build({
  outDir: "./build",
  inDir: "./src",
  minify: false,
  defaultLanguage: "en",
});
