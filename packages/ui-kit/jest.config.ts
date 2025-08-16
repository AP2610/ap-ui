import config from "@ap/jest-config";
import { type Config } from "jest";

const uiKitConfig: Config = {
  ...config,
  setupFilesAfterEnv: ["@ap/jest-config/setup"],
};

export default uiKitConfig;
