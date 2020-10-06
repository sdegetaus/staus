import path from "path";
import * as utils from "../utils";

/**
 * Get the project's configuration.
 */
export const getConfig = async (): Promise<StausConfig> => {
  return {
    ...defaultStausConfig,
    ...((await import(
      path.join(utils.getRootPath(), `staus.config.json`)
    )) as StausConfig),
  };
};

const defaultStausConfig: StausConfig = {
  minify: true,
  defaultLocale: "en",
  locales: ["en"],
};

interface StausConfig {
  minify: boolean;
  defaultLocale: string;
  locales: string[];
}
