import path from "path";
import * as utils from "../utils";

/**
 * Get the project's configuration.
 */
export const getConfig = async (): Promise<StausConfig> => {
  return {
    minify: true,
    defaultLocale: "en",
    locales: ["en"],
    ...((await import(
      path.join(utils.getRootPath(), `staus.config.json`)
    )) as StausConfig),
  };
};

interface StausConfig {
  minify: boolean;
  defaultLocale: string;
  locales: string[];
}
