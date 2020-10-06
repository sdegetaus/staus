import path from "path";

// TODO: clean
// How to get the root of project which installed my npm module?
// https://stackoverflow.com/a/57102773
export const getRootPath = () => {
  const fullPath = path.dirname(require.main.filename);
  const regexResp = /^(.*?)library/.exec(fullPath);
  return regexResp ? regexResp[1] : fullPath;
};

export const getConfig = async () => {
  return (await import(
    path.join(getRootPath(), `staus.config.json`)
  )) as Config; // todo: defaults
};

interface Config {
  outDir: string;
  inDir: string;
  minify: boolean;
  defaultLanguage: string;
  locales: string[];
}
