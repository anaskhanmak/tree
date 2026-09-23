import { treeRepository } from "../repositories/tree.repository.js";
import { verificationRepository } from "../repositories/verification.repository.js";
import { growthRepository } from "../repositories/growth.repository.js";
import { certificateRepository } from "../repositories/certificate.repository.js";
import { TreeStatus, TreeVerificationStatus, VALID_TREE_TRANSITIONS } from "../constants/tree-status.js";
import { auditRepository } from "../repositories/audit.repository.js";

export class TreeService {
  async getTreeByCode(treeCode: string) {
    const tree = await treeRepository.findByTreeCode(treeCode);
    if (!tree) {
      throw new Error(`Tree with code ${treeCode} not found.`);
    }

    const proof = await verificationRepository.findByTreeId(tree.id);
    const growthUpdates = await growthRepository.findByTreeId(tree.id);

    let certificate = null;
    if (tree.verification_status === TreeVerificationStatus.VERIFIED) {
      certificate = await certificateRepository.findByCertificateNumber(
        `CERT-2026-${String(tree.id).padStart(6, "0")}`
      );
    }

    return {
      tree,
      proof,
      growthUpdates,
      certificate,
    };
  }

  async transitionStatus(treeId: number, nextStatus: TreeStatus, actorId: number) {
    const tree = await treeRepository.findById(treeId);
    if (!tree) throw new Error("Tree not found");

    const allowedNext = VALID_TREE_TRANSITIONS[tree.status] || [];
    if (!allowedNext.includes(nextStatus)) {
      throw new Error(
        `Invalid lifecycle transition from '${tree.status}' to '${nextStatus}'. Permitted: [${allowedNext.join(", ")}]`
      );
    }

    await treeRepository.updateStatus(treeId, nextStatus);

    await auditRepository.log({
      userId: actorId,
      action: "TREE_STATUS_TRANSITION",
      entityType: "TREE",
      entityId: treeId,
      oldValues: { status: tree.status },
      newValues: { status: nextStatus },
    });
  }
}

export const treeService = new TreeService();
