import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { ApiResponse } from "../utils/api-response.js";

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.unauthorized(res, "Missing or malformed Authorization header");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return ApiResponse.unauthorized(res, "Authentication token expired");
    }
    return ApiResponse.unauthorized(res, "Invalid authentication token");
  }
}

// Optional auth for public routes where logged in user gets custom state
export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = verifyAccessToken(token);
      req.user = decoded;
    }
  } catch {
    // Ignore error for optional auth
  }
  return next();
}
