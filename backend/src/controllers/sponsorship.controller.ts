import { Response } from "express";
import { sponsorshipService } from "../services/sponsorship.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class SponsorshipController {
  async sponsor(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.unauthorized(res);

      const result = await sponsorshipService.sponsorTree({
        donorId: req.user.userId,
        campaignId: Number(req.body.campaignId),
        speciesId: Number(req.body.speciesId),
        quantity: Number(req.body.quantity) || 1,
        dedicationMessage: req.body.dedicationMessage,
        ipAddress: req.ip,
      });

      return ApiResponse.created(res, result, "Tree sponsorship processed successfully.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }
}

export const sponsorshipController = new SponsorshipController();
