import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index.js";
import { UserRole } from "../constants/roles.js";
import { ApiResponse } from "../utils/api-response.js";

/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces server-side permissions
 */
export function authorizeRoles(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ApiResponse.unauthorized(res, "Authentication required");
    }

    if (req.user.role === UserRole.SUPER_ADMIN || allowedRoles.includes(req.user.role)) {
      return next();
    }

    return ApiResponse.forbidden(
      res,
      `Forbidden: Your role (${req.user.role}) is not authorized to access this resource`
    );
  };
}
