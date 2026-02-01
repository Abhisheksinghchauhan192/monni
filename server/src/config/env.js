import dotenv from "dotenv";

dotenv.config();

const requireEnv = ["PORT", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

requireEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing Environment Variable ${key}`);
  }
});

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

