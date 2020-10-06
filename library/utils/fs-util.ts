import fs from "fs";
import path from "path";

/**
 * Remove all files and sub-directories in a directory. Adapted from @guybedford's code:
 * https://gist.github.com/liangzan/807712/8fb16263cb39e8472d17aea760b6b1492c465af2#gistcomment-337828
 * @param dirPath
 */
export const removeDirContent = (dirPath: string) => {
  try {
    const files = fs.readdirSync(dirPath);
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        var filePath = path.join(dirPath, files[i]);
        if (fs.statSync(filePath).isFile()) {
          fs.unlinkSync(filePath);
        } else {
          removeDirContent(filePath);
        }
      }
    }
  } catch (e) {
    throw e;
  }
};

/**
 * Synchronously create directory if it doesn't exist
 * @param dirPath
 */
export const ensureDirSync = (dirPath: string) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
};

/**
 * Get the root path
 * https://stackoverflow.com/a/57102773
 */
const getRootPath = () => {
  const fullPath = path.dirname(require.main.filename);
  const regexResp = /^(.*?)library/.exec(fullPath);
  return regexResp ? regexResp[1] : fullPath;
};

export default { removeDirContent, ensureDirSync, getRootPath };
