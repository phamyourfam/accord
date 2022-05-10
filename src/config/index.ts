import dotenv from "dotenv";
import typeormConfig from "./typeorm";
import {join} from "path";
import {loggerConfig} from "./logger";

const {version} = require("../../package.json");
export const rootDir = join(__dirname, "..");

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  typeorm: typeormConfig,
  ...dotenv.config({path: `${rootDir}/config/env/.env`}).parsed
};
