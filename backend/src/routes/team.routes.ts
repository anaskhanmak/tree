import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import { UserRole } from "../constants/roles.js";
import { verificationController } from "../controllers/verification.controller.js";
import { growthRepository } from "../repositories/growth.repository.js";
import { treeRepository } from "../repositories/tree.repository.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

const router = Router();

router.use(authenticate, authorizeRoles(UserRole.PLANTATION_TEAM, UserRole.ADMIN));

router.get("/dashboard", async (req: AuthenticatedRequest, res) => {
  const trees = await treeRepository.findAll({ status: "assigned" });
  return ApiResponse.success(res, {
    assignedCount: trees.trees.length,
    activeSquad: "Alpha Karachi Field Squad",
    assignedTrees: trees.trees.slice(0, 10),
  });
});

router.get("/trees", async (req, res) => {
  const trees = await treeRepository.findAll({ status: req.query.status as string });
  return ApiResponse.success(res, trees.trees);
});

router.post("/plantation-proof", verificationController.submitProof);

router.post("/growth-update", async (req: AuthenticatedRequest, res) => {
  try {
    const update = await growthRepository.addGrowthUpdate({
      treeId: Number(req.body.treeId),
      submittedBy: req.user!.userId,
      monthMilestone: req.body.monthMilestone || "Month 3",
      updateDate: req.body.updateDate || new Date().toISOString().split("T")[0],
      heightCm: Number(req.body.heightCm),
      healthStatus: req.body.healthStatus || "healthy",
      imageUrl: req.body.imageUrl || "/assets/images/tree_sapling.png",
      notes: req.body.notes,
    });
    return ApiResponse.created(res, update, "Growth update logged.");
  } catch (err: any) {
    return ApiResponse.badRequest(res, err.message);
  }
});

export default router;
