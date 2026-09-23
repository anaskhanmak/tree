import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.register({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        city: req.body.city,
        ipAddress: req.ip,
      });

      return ApiResponse.created(res, result, "Account registered successfully.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.login({
        email: req.body.email,
        password: req.body.password,
        ipAddress: req.ip,
      });

      return ApiResponse.success(res, result, "Signed in successfully.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }

  async me(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return ApiResponse.unauthorized(res);
    return ApiResponse.success(res, req.user, "Current authenticated session.");
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const token = req.body.refreshToken;
      if (!token) return ApiResponse.badRequest(res, "Refresh token required");
      const tokens = await authService.refreshToken(token);
      return ApiResponse.success(res, tokens, "Token refreshed successfully.");
    } catch (err: any) {
      return ApiResponse.unauthorized(res, err.message);
    }
  }

  async logout(req: Request, res: Response) {
    return ApiResponse.success(res, null, "Logged out successfully.");
  }
}

export const authController = new AuthController();
