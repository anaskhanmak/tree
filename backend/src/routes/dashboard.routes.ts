import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { analyticsController } from "../controllers/analytics.controller.js";
import { treeController } from "../controllers/tree.controller.js";
import { sponsorshipController } from "../controllers/sponsorship.controller.js";
import { certificateRepository } from "../repositories/certificate.repository.js";
import { rewardRepository } from "../repositories/reward.repository.js";
import { notificationRepository } from "../repositories/notification.repository.js";
import { ApiResponse } from "../utils/api-response.js";
import { AuthenticatedRequest } from "../types/index.js";

const router = Router();

router.use(authenticate);

// Donor Overview
router.get("/overview", analyticsController.getDonorDashboard);

// Donor Trees
router.get("/trees", treeController.getMyTrees);

// Sponsor a Tree
router.post("/sponsor", sponsorshipController.sponsor);

// Donor Certificates
router.get("/certificates", async (req: AuthenticatedRequest, res) => {
  const certs = await certificateRepository.findByDonorId(req.user!.userId);
  return ApiResponse.success(res, certs, "Certificates retrieved.");
});

// Donor Rewards & Badges
router.get("/rewards", async (req: AuthenticatedRequest, res) => {
  const pointsHistory = await rewardRepository.getPointsHistory(req.user!.userId);
  const badges = await rewardRepository.getAllBadges();
  const earnedBadges = await rewardRepository.getUserBadges(req.user!.userId);

  return ApiResponse.success(res, {
    pointsHistory,
    badges,
    earnedBadges,
  });
});

// Notifications
router.get("/notifications", async (req: AuthenticatedRequest, res) => {
  const notifs = await notificationRepository.findByUserId(req.user!.userId);
  return ApiResponse.success(res, notifs);
});

router.patch("/notifications/:id/read", async (req: AuthenticatedRequest, res) => {
  await notificationRepository.markAsRead(Number(req.params.id), req.user!.userId);
  return ApiResponse.success(res, null, "Notification marked as read.");
});

router.patch("/notifications/read-all", async (req: AuthenticatedRequest, res) => {
  await notificationRepository.markAllAsRead(req.user!.userId);
  return ApiResponse.success(res, null, "All notifications marked as read.");
});

export default router;
