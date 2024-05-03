// Loading process.env as ENV interface

import { ENV, Config } from "../types/types.env";
export const getConfig = (): ENV => {
  const secure = process.env.EMAIL_SECURE?.toLowerCase() === "true";
  return {
    FRONTEND_MAIN_URL: process.env.FRONTEND_MAIN_URL,
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
