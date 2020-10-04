import Staus from "../staus";
import { l10n } from "./l10n";

Staus.build(l10n, {
  outDir: "./build",
  inDir: "./src",
  minify: false,
  defaultLanguage: "en",
});
