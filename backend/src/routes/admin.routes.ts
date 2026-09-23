import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import { UserRole } from "../constants/roles.js";
import { verificationController } from "../controllers/verification.controller.js";
import { analyticsController } from "../controllers/analytics.controller.js";
import { treeController } from "../controllers/tree.controller.js";
import { userRepository } from "../repositories/user.repository.js";
import { auditRepository } from "../repositories/audit.repository.js";
import { ApiResponse } from "../utils/api-response.js";

const router = Router();

// Protect all admin routes
router.use(authenticate, authorizeRoles(UserRole.ADMIN, UserRole.SUPER_ADMIN));

router.get("/dashboard", analyticsController.getAdminOverview);
router.get("/verification", verificationController.getPendingQueue);
router.patch("/verification/:id/approve", verificationController.approveProof);
router.patch("/verification/:id/reject", verificationController.rejectProof);
router.get("/trees", treeController.getAllTreesAdmin);
router.get("/analytics/overview", analyticsController.getAdminOverview);
router.get("/analytics/donor-retention", analyticsController.getDonorRetention);

router.get("/users", async (req, res) => {
  const result = await userRepository.findAll({
    role: req.query.role as string,
    search: req.query.search as string,
  });
  return ApiResponse.success(res, result.users, "Users retrieved.");
});

router.get("/audit-logs", async (req, res) => {
  const logs = await auditRepository.getRecentLogs(50);
  return ApiResponse.success(res, logs, "Recent audit logs.");
});

export default router;
