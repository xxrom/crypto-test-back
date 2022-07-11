import env from "dotenv";
env.config();

export type EnvType = "PROD" | "DEV" | "TEST";

export const NODE_ENV = process.env.NODE_ENV as EnvType;
export const API_KEY_NOMICS = String(process.env.API_KEY_NOMICS) as string;
export const PORT = (NODE_ENV !== "TEST" ? process.env.PORT : "4455") || "4444";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_HEADER_KEY = process.env.JWT_HEADER_KEY;

console.log(`NODE_ENV: ${NODE_ENV}`);
console.log(`API_KEY_NOMICS: ${API_KEY_NOMICS}`);
console.log(`PORT: ${PORT}`);
console.log(`JWT_SECRET_KEY: ${JWT_SECRET_KEY}`);
console.log(`JWT_HEADER_KEY: ${JWT_HEADER_KEY}`);
