import path from "path";
import fsUtil from "../utils/fs-util";

/**
 * Get the project's configuration.
 */
const getConfig = async (): Promise<BuildConfig> => {
  return {
    minify: true,
    intl: null,
    styles: {
      name: "style",
      files: [],
    },
    headScripts: {
      name: "head",
      files: [],
    },
    bodyScripts: {
      name: "body",
      files: [],
    },
    ...((await import(
      path.join(fsUtil.getRootPath(), `staus.config.json`)
    )) as BuildConfig),
  };
};

export interface BuildConfig {
  minify: boolean;
  intl: string;
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
