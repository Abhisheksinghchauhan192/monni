import dotenv from "dotenv";

dotenv.config();

/* ===== Shared (used everywhere) ===== */
const sharedEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];

/* ===== Server-only ===== */
const serverEnv = [];

function validate(keys) {
  keys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing Environment Variable ${key}`);
    }
  });
}

/* Validate shared env ALWAYS */
validate(sharedEnv);

//  db sec. 
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

// JWT SEC.
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
// cloudinary secrets
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
export const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
// node env
export const NODE_ENV = process.env.NODE_ENV;
// resend email service key
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
// gemini api key
export const GEMINI_API_KEY=process.env.GEMINI_API_KEY;
// openai api key
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// operoouer api key 
export const OPENROUTER_API_KEY=process.env.OPENROUTER_API_KEY;
// Url for frontend reset magin link
export const FRONTEND_URL=process.env.FRONTEND_URL;


/* Export server-specific validation */
export function validateServerEnv() {
  validate(serverEnv);
  return {
    PORT: process.env.PORT || 3000,
  };
}
