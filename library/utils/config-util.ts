import path from "path";
import fsUtil from "../utils/fs-util";

/**
 * Get the project's configuration.
 */
const getConfig = async (): Promise<StausConfig> => {
  return {
    minify: true,
    defaultLocale: "en",
    locales: ["en"],
    ...((await import(
      path.join(fsUtil.getRootPath(), `staus.config.json`)
    )) as StausConfig),
  };
};

interface StausConfig {
  minify: boolean;
  defaultLocale: string;
  locales: string[];
}

export default { getConfig };
