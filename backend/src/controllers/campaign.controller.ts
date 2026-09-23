import { Request, Response } from "express";
import { campaignRepository } from "../repositories/campaign.repository.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class CampaignController {
  async getAll(req: Request, res: Response) {
    const { city, status, organizationId, search, page, limit } = req.query;
    const result = await campaignRepository.findAll({
      city: city as string,
      status: status as any,
      organizationId: organizationId ? Number(organizationId) : undefined,
      search: search as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });

    return ApiResponse.success(res, result.campaigns, "Campaigns retrieved.", 200, {
      page: Number(page) || 1,
      limit: Number(limit) || 20,
      total: result.total,
      totalPages: Math.ceil(result.total / (Number(limit) || 20)) || 1,
    });
  }

  async getBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const campaign = await campaignRepository.findBySlug(slug);
    if (!campaign) return ApiResponse.notFound(res, "Campaign not found");
    return ApiResponse.success(res, campaign, "Campaign retrieved.");
  }

  async create(req: AuthenticatedRequest, res: Response) {
    try {
      const campaign = await campaignRepository.create({
        organizationId: req.body.organizationId || 1,
        name: req.body.name,
        slug: req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: req.body.description,
        city: req.body.city,
        area: req.body.area,
        targetTrees: req.body.targetTrees,
        pricePerTree: req.body.pricePerTree,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        createdBy: req.user?.userId,
      });

      return ApiResponse.created(res, campaign, "Campaign created successfully.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }
}

export const campaignController = new CampaignController();
