import { verificationRepository } from "../repositories/verification.repository.js";
import { treeRepository } from "../repositories/tree.repository.js";
import { campaignRepository } from "../repositories/campaign.repository.js";
import { certificateRepository } from "../repositories/certificate.repository.js";
import { rewardRepository } from "../repositories/reward.repository.js";
import { notificationRepository } from "../repositories/notification.repository.js";
import { auditRepository } from "../repositories/audit.repository.js";
import { TreeStatus, TreeVerificationStatus } from "../constants/tree-status.js";
import { generateCertificateNumber } from "../utils/tree-id-generator.js";
import { GREEN_POINTS_RULES } from "../constants/points.js";

export class VerificationService {
  async submitPlantationProof(data: {
    treeId: number;
    teamUserId: number;
    imageUrl: string;
    plantationDate: string;
    latitude: number;
    longitude: number;
    soilCondition?: string;
    notes?: string;
  }) {
    const tree = await treeRepository.findById(data.treeId);
    if (!tree) throw new Error("Tree not found");

    const proof = await verificationRepository.submitProof({
      treeId: data.treeId,
      submittedBy: data.teamUserId,
      imageUrl: data.imageUrl,
      plantationDate: data.plantationDate,
      latitude: data.latitude,
      longitude: data.longitude,
      soilCondition: data.soilCondition,
      notes: data.notes,
    });

    // Advance tree status to 'planted'
    await treeRepository.updateStatus(data.treeId, TreeStatus.PLANTED, TreeVerificationStatus.PENDING, {
      latitude: data.latitude,
      longitude: data.longitude,
    });

    await auditRepository.log({
      userId: data.teamUserId,
      action: "SUBMIT_PLANTATION_PROOF",
      entityType: "TREE",
      entityId: data.treeId,
    });

    return proof;
  }

  async approveProof(proofId: number, adminUserId: number) {
    const proofs = await verificationRepository.getPendingProofs();
    const proof = proofs.find((p) => p.id === proofId);
    if (!proof) throw new Error("Pending proof not found");

    const tree = await treeRepository.findById(proof.tree_id);
    if (!tree) throw new Error("Tree not found");

    // 1. Update proof status
    await verificationRepository.updateProofStatus(proofId, "approved", adminUserId);

    // 2. Update tree status to verified & growing
    await treeRepository.updateStatus(tree.id, TreeStatus.GROWING, TreeVerificationStatus.VERIFIED);

    // 3. Increment campaign verified trees count
    await campaignRepository.incrementVerifiedCount(tree.campaign_id, 1);

    // 4. Generate Certificate
    const certNumber = generateCertificateNumber(tree.id);
    const certificate = await certificateRepository.create({
      certificateNumber: certNumber,
      treeId: tree.id,
      donorId: tree.donor_id,
      campaignId: tree.campaign_id,
      organizationId: tree.organization_id,
    });

    // 5. Award verification points
    await rewardRepository.addPoints({
      userId: tree.donor_id,
      points: GREEN_POINTS_RULES.TREE_VERIFIED,
      type: "TREE_VERIFIED",
      referenceType: "TREE",
      referenceId: tree.id,
      description: `Plantation audit verified for ${tree.tree_code}`,
    });

    // 6. Notify donor
    await notificationRepository.create({
      userId: tree.donor_id,
      type: "TREE_VERIFIED",
      title: "✅ Plantation Verified & Certificate Ready!",
      message: `Auditor verified your tree ${tree.tree_code}. Certificate ${certNumber} has been issued.`,
      data: { treeCode: tree.tree_code, certificateNumber: certNumber },
    });

    // 7. Audit log
    await auditRepository.log({
      userId: adminUserId,
      action: "APPROVE_VERIFICATION",
      entityType: "TREE",
      entityId: tree.id,
      newValues: { certificateNumber: certNumber },
    });

    return { tree, certificate };
  }

  async rejectProof(proofId: number, adminUserId: number, reason: string) {
    await verificationRepository.updateProofStatus(proofId, "rejected", adminUserId, reason);

    await auditRepository.log({
      userId: adminUserId,
      action: "REJECT_VERIFICATION",
      entityType: "PROOF",
      entityId: proofId,
      newValues: { reason },
    });

    return { message: "Plantation proof rejected and squad notified to retake geotag." };
  }
}

export const verificationService = new VerificationService();
