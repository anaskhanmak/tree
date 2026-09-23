import { Request, Response } from "express";
import { treeService } from "../services/tree.service.js";
import { treeRepository } from "../repositories/tree.repository.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class TreeController {
  async getByCode(req: Request, res: Response) {
    try {
      const { treeCode } = req.params;
      const result = await treeService.getTreeByCode(treeCode);
      return ApiResponse.success(res, result, "Tree passport retrieved.");
    } catch (err: any) {
      return ApiResponse.notFound(res, err.message);
    }
  }

  async getMyTrees(req: AuthenticatedRequest, res: Response) {
    if (!req.user) return ApiResponse.unauthorized(res);
    const { status, search, page, limit } = req.query;

    const result = await treeRepository.findByDonorId(req.user.userId, {
      status: status as string,
      search: search as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });

    return ApiResponse.success(res, result.trees, "Donor trees retrieved.", 200, {
      page: Number(page) || 1,
      limit: Number(limit) || 20,
      total: result.total,
      totalPages: Math.ceil(result.total / (Number(limit) || 20)) || 1,
    });
  }

  async getAllTreesAdmin(req: AuthenticatedRequest, res: Response) {
    const { status, city, search, page, limit } = req.query;
    const result = await treeRepository.findAll({
      status: status as string,
      city: city as string,
      search: search as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });

    return ApiResponse.success(res, result.trees, "Trees retrieved for admin.", 200, {
      page: Number(page) || 1,
      limit: Number(limit) || 20,
      total: result.total,
      totalPages: Math.ceil(result.total / (Number(limit) || 20)) || 1,
    });
  }
}

export const treeController = new TreeController();
