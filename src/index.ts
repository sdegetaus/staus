import Staus from "library";
import { intlData } from "./intl";

Staus.setIntlData(intlData);

Staus.build({
  outDir: "./build",
  inDir: "./src",
  minify: false,
  defaultLanguage: "en",
});
