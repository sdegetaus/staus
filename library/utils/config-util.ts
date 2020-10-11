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
    styles: {
      name: "style",
      files: [],
    },
    // change these defaults...
    headScripts: {
      name: "_",
      files: [],
    },
    bodyScripts: {
      name: "__",
      files: [],
    },
    ...((await import(
      path.join(fsUtil.getRootPath(), `staus.config.json`)
    )) as StausConfig),
  };
};

interface StausConfig {
  minify: boolean;
  defaultLocale: string;
  locales: string[];
  styles: {
    name: string;
    files: string[];
  };
  headScripts: {
    name: string;
    files: string[];
  };
  bodyScripts: {
    name: string;
    files: string[];
  };
}

export default { getConfig };
