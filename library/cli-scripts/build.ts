import build from "../build";
import configUtil from "../utils/config-util";

const test = build;

(async () => {
  const CONFIG = await configUtil.getConfig();
  await test(CONFIG);
})();
