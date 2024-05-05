import dotenv from "dotenv";
// Loading process.env as ENV interface

import { ENV, Config } from "../types/types.env";
dotenv.config();

export const getConfig = (): ENV => {
  return {
    WEBSOCKET_PORT: Number(process.env.WEBSOCKET_PORT),
    JWT_SECRET: process.env.JWT_SECRET,
    SERVER_PORT: Number(process.env.SERVER_PORT),
  };
};

export const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
