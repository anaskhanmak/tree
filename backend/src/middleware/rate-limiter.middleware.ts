import rateLimit from "express-rate-limit";
import { ENV } from "../config/env.js";
import { ApiResponse } from "../utils/api-response.js";

export const standardRateLimiter = rateLimit({
  windowMs: ENV.RATE_LIMIT.WINDOW_MS,
  max: ENV.RATE_LIMIT.MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: any, res: any) => {
    return ApiResponse.error(
      res,
      "Too many requests from this IP, please try again after 15 minutes.",
      429
    );
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // Max 15 login/register attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: any, res: any) => {
    return ApiResponse.error(
      res,
      "Excessive authentication attempts. Please wait 15 minutes before retrying.",
      429
    );
  },
});
