import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import { ENV } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { ApiResponse } from "./utils/api-response.js";
import { standardRateLimiter } from "./middleware/rate-limiter.middleware.js";

export function createApp(): Express {
  const app = express();

  // Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: [ENV.FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
  );

  // Performance & Body Parsing
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Request Logging
  if (ENV.NODE_ENV !== "test") {
    app.use(morgan("dev"));
  }

  // Rate Limiting
  app.use(standardRateLimiter);

  // Static uploads directory
  const uploadsPath = path.resolve(process.cwd(), ENV.STORAGE.UPLOAD_DIR);
  app.use("/uploads", express.static(uploadsPath));

  // Health check at root
  app.get("/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "TreeMint API Server is running.",
      timestamp: new Date().toISOString(),
    });
  });

  // Mount API Routers
  app.use(ENV.API_PREFIX, apiRouter);
  app.use("/api", apiRouter); // Backward compatibility fallback

  // 404 Route Handler
  app.use((req, res) => {
    return ApiResponse.notFound(res, `Endpoint [${req.method} ${req.url}] not found on TreeMint API server.`);
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}
