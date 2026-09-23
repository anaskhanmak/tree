import { Router } from "express";
import { campaignController } from "../controllers/campaign.controller.js";
import { treeController } from "../controllers/tree.controller.js";
import { certificateRepository } from "../repositories/certificate.repository.js";
import { organizationRepository } from "../repositories/organization.repository.js";
import { ApiResponse } from "../utils/api-response.js";

const router = Router();

// Public campaigns
router.get("/campaigns", campaignController.getAll);
router.get("/campaigns/:slug", campaignController.getBySlug);

// Public organizations
router.get("/organizations", async (req, res) => {
  const orgs = await organizationRepository.findAll({});
  return ApiResponse.success(res, orgs, "Organizations retrieved.");
});

// Public Tree Ledger
router.get("/trees/:treeCode", treeController.getByCode);

// Public Certificate Verification
router.get("/certificates/:certificateNumber", async (req, res) => {
  const cert = await certificateRepository.findByCertificateNumber(req.params.certificateNumber);
  if (!cert) return ApiResponse.notFound(res, "Certificate not found or revoked.");
  return ApiResponse.success(res, cert, "Certificate verified.");
});

export default router;
