import { Request, Response } from "express";
import { verificationService } from "../services/verification.service.js";
import { verificationRepository } from "../repositories/verification.repository.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

export class VerificationController {
  async getPendingQueue(req: AuthenticatedRequest, res: Response) {
    const proofs = await verificationRepository.getPendingProofs();
    return ApiResponse.success(res, proofs, "Pending verification queue retrieved.");
  }

  async submitProof(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.unauthorized(res);

      const result = await verificationService.submitPlantationProof({
        treeId: Number(req.body.treeId),
        teamUserId: req.user.userId,
        imageUrl: req.body.imageUrl || "/assets/images/tree_sapling.png",
        plantationDate: req.body.plantationDate || new Date().toISOString().split("T")[0],
        latitude: Number(req.body.latitude),
        longitude: Number(req.body.longitude),
        soilCondition: req.body.soilCondition,
        notes: req.body.notes,
      });

      return ApiResponse.created(res, result, "Plantation proof submitted for audit.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }

  async approveProof(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.unauthorized(res);
      const proofId = Number(req.params.id);

      const result = await verificationService.approveProof(proofId, req.user.userId);
      return ApiResponse.success(res, result, "Plantation verified and certificate issued.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }

  async rejectProof(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) return ApiResponse.unauthorized(res);
      const proofId = Number(req.params.id);
      const reason = req.body.reason || "Proof rejected due to low geotag confidence";

      const result = await verificationService.rejectProof(proofId, req.user.userId, reason);
      return ApiResponse.success(res, result, "Plantation proof rejected.");
    } catch (err: any) {
      return ApiResponse.badRequest(res, err.message);
    }
  }
}

export const verificationController = new VerificationController();
