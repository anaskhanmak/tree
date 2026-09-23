import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";
import { ApiResponse } from "../utils/api-response.js";
import { ENV } from "../config/env.js";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(`Unhandled Error [${req.method} ${req.url}]:`, err.stack || err.message);

  // MySQL Duplicate entry error (1062)
  if (err.errno === 1062 || err.code === "ER_DUP_ENTRY") {
    return ApiResponse.conflict(res, "A record with this unique identifier already exists.");
  }

  // MySQL Foreign Key Constraint error (1452)
  if (err.errno === 1452 || err.code === "ER_NO_REFERENCED_ROW_2") {
    return ApiResponse.badRequest(res, "Referenced entity does not exist.");
  }

  // Multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return ApiResponse.badRequest(res, "Uploaded file exceeds maximum allowed size of 5MB.");
  }

  const statusCode = err.statusCode || 500;
  const message =
    ENV.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error occurred. Please contact support."
      : err.message || "Internal server error";

  return ApiResponse.error(res, message, statusCode, err.errors || []);
}
