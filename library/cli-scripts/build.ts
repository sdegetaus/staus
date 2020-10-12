import build from "../build";
import configUtil from "../utils/config-util";

(async () => {
  const CONFIG = await configUtil.getConfig();
  await build(CONFIG);
})();
