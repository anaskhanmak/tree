import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validators/auth.validator.js";
import { authRateLimiter } from "../middleware/rate-limiter.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, validateBody(registerSchema), authController.register);
router.post("/login", authRateLimiter, validateBody(loginSchema), authController.login);
router.post("/refresh", validateBody(refreshTokenSchema), authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
