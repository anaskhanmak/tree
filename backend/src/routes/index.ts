import { Router } from "express";
import authRoutes from "./auth.routes.js";
import publicRoutes from "./public.routes.js";
import adminRoutes from "./admin.routes.js";
import teamRoutes from "./team.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import { campaignController } from "../controllers/campaign.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import { UserRole } from "../constants/roles.js";

const apiRouter = Router();

// 1. Health check endpoint
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TreeMint REST API is running healthy.",
    timestamp: new Date().toISOString(),
    service: "treemint-backend",
  });
});

// 2. Auth routes (/api/v1/auth)
apiRouter.use("/auth", authRoutes);

// 3. Public routes (/api/v1/public and root)
apiRouter.use("/public", publicRoutes);
apiRouter.use("/", publicRoutes); // Direct access like /api/v1/campaigns

// 4. Donor routes (/api/v1/dashboard & /api/v1/my)
apiRouter.use("/dashboard", dashboardRoutes);
apiRouter.use("/my", dashboardRoutes);

// 5. Admin routes (/api/v1/admin)
apiRouter.use("/admin", adminRoutes);

// 6. Field Team routes (/api/v1/team)
apiRouter.use("/team", teamRoutes);

// 7. Organization routes (/api/v1/organization)
apiRouter.post(
  "/organization/campaigns",
  authenticate,
  authorizeRoles(UserRole.ORGANIZATION, UserRole.ADMIN),
  campaignController.create
);

export default apiRouter;
