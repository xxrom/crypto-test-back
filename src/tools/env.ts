export type EnvType = "PROD" | "DEV" | "TEST";

export const NODE_ENV = process.env.NODE_ENV as EnvType;
