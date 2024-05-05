export interface ENV {
  WEBSOCKET_PORT: number | undefined;
  JWT_SECRET: string | undefined;
  SERVER_PORT: number | undefined;
}

export interface Config {
  WEBSOCKET_PORT: number;
  JWT_SECRET: string;
  SERVER_PORT: number;
}
