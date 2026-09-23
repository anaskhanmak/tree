import { Response } from "express";
import { analyticsService } from "../services/analytics.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class AnalyticsController {
  async getAdminOverview(req: AuthenticatedRequest, res: Response) {
    const stats = await analyticsService.getAdminOverview();
    return ApiResponse.success(res, stats, "Admin analytics overview.");
  }

  async getDonorDashboard(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return ApiResponse.unauthorized(res);
    const stats = await analyticsService.getDonorDashboard(req.user.userId);
    return ApiResponse.success(res, stats, "Donor dashboard analytics.");
  }

  async getDonorRetention(req: AuthenticatedRequest, res: Response) {
    const stats = await analyticsService.getDonorRetentionAnalytics();
    return ApiResponse.success(res, stats, "Donor retention analytics.");
  }
}

export const analyticsController = new AnalyticsController();
