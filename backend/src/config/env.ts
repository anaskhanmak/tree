import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5001,
  API_PREFIX: process.env.API_PREFIX || "/api/v1",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3001",

  // Database
  DB: {
    HOST: process.env.DB_HOST || "localhost",
    PORT: Number(process.env.DB_PORT) || 3306,
    NAME: process.env.DB_NAME || "treemint",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  },

  // JWT
  JWT: {
    ACCESS_SECRET:
      process.env.JWT_ACCESS_SECRET ||
      "treemint_jwt_super_secure_access_secret_2026_key",
    REFRESH_SECRET:
      process.env.JWT_REFRESH_SECRET ||
      "treemint_jwt_super_secure_refresh_secret_2026_key",
    ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "15m",
    REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
  },

  // Uploads
  STORAGE: {
    UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
    MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE_BYTES) || 5 * 1024 * 1024, // 5MB
    ALLOWED_MIMES: ["image/jpeg", "image/png", "image/webp"],
  },

  // Email (Nodemailer)
  SMTP: {
    HOST: process.env.SMTP_HOST || "smtp.mailtrap.io",
    PORT: Number(process.env.SMTP_PORT) || 2525,
    USER: process.env.SMTP_USER || "",
    PASSWORD: process.env.SMTP_PASSWORD || "",
    FROM: process.env.SMTP_FROM || "no-reply@treemint.org",
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    MAX: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  },
};
