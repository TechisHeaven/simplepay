import dotenv from "dotenv";
// Loading process.env as ENV interface

import { ENV, Config } from "../types/types.env";
dotenv.config();

export const getConfig = (): ENV => {
  return {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
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
