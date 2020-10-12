import fs from "fs";
import path from "path";

/**
 * Recursively remove all files and sub-directories in a directory.
 * Adapted from @guybedford's code:
 * https://gist.github.com/liangzan/807712/8fb16263cb39e8472d17aea760b6b1492c465af2#gistcomment-337828
 */
const removeDirContent = (dirPath: string) => {
  try {
    fs.readdirSync(dirPath).forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        fs.unlinkSync(filePath);
      } else if (stat.isDirectory()) {
        removeDirContent(filePath);
        fs.rmdirSync(filePath);
      } else {
        console.info(
          `Skipping ${filePath} because it is neither a file or a directory.`
        );
      }
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Synchronously create directory if it doesn't exist.
 */
const ensureDirSync = (dirPath: string) => {
  try {
    fs.mkdirSync(dirPath);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
};

/**
 * Recursively copy all files and directories.
 */
const copyAll = (srcDir: string, destDir: string) => {
  try {
    fs.readdirSync(srcDir).forEach((file) => {
      const filePath = path.join(srcDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        fs.copyFileSync(filePath, path.join(destDir, file));
      } else if (stat.isDirectory()) {
        const subDestDir = path.join(destDir, file);
        ensureDirSync(subDestDir);
        copyAll(filePath, subDestDir);
      } else {
        console.info(
          `Skipping ${filePath} because it is neither a file or a directory.`
        );
      }
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Get the root path (where the root `node_modules` are!)
 * https://stackoverflow.com/a/57102773
 */
const getRootPath = () => {
  const fullPath = path.dirname(require.main.filename);
  const regexResp = /^(.*?)library/.exec(fullPath); // should be changed to node_modules
  return regexResp ? regexResp[1] : fullPath;
};

export default { removeDirContent, ensureDirSync, getRootPath, copyAll };
