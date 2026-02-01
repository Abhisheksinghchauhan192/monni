import dotenv from "dotenv";

dotenv.config();

/* ===== Shared (used everywhere) ===== */
const sharedEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

/* ===== Server-only ===== */
const serverEnv = ["PORT"];

function validate(keys) {
  keys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Environment Variable ${key}`);
    }
  });
}

/* Validate shared env ALWAYS */
validate(sharedEnv);

/* Export values */
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

/* Export server-specific validation */
export function validateServerEnv() {
  validate(serverEnv);
  return {
    PORT: process.env.PORT,
  };
}
