import { db } from "../database/connection.js";
import { campaignRepository } from "../repositories/campaign.repository.js";
import { treeRepository } from "../repositories/tree.repository.js";
import { sponsorshipRepository } from "../repositories/sponsorship.repository.js";
import { rewardRepository } from "../repositories/reward.repository.js";
import { notificationRepository } from "../repositories/notification.repository.js";
import { auditRepository } from "../repositories/audit.repository.js";
import { generateTreeCode } from "../utils/tree-id-generator.js";
import { CampaignStatus } from "../constants/tree-status.js";
import { GREEN_POINTS_RULES } from "../constants/points.js";

export class SponsorshipService {
  async sponsorTree(data: {
    donorId: number;
    campaignId: number;
    speciesId: number;
    dedicationMessage?: string;
    quantity?: number;
    ipAddress?: string;
  }) {
    const campaign = await campaignRepository.findById(data.campaignId);
    if (!campaign) {
      throw new Error("Campaign not found.");
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new Error("This campaign is not currently active for public sponsorship.");
    }

    const quantity = data.quantity && data.quantity > 0 ? data.quantity : 1;
    const createdTrees = [];

    // Transaction execution
    for (let i = 0; i < quantity; i++) {
      const cityTotal = (await treeRepository.countByCity(campaign.city)) + 1 + i;
      const treeCode = generateTreeCode(campaign.city, cityTotal);

      const tree = await treeRepository.create({
        treeCode,
        donorId: data.donorId,
        campaignId: campaign.id,
        organizationId: campaign.organization_id,
        speciesId: data.speciesId,
        city: campaign.city,
        area: campaign.area,
        dedicationMessage: data.dedicationMessage,
        plantationTeamId: 1, // Default assign to primary regional team
      });

      await sponsorshipRepository.create({
        userId: data.donorId,
        treeId: tree.id,
        campaignId: campaign.id,
        organizationId: campaign.organization_id,
        amount: campaign.price_per_tree,
        paymentStatus: "paid",
      });

      createdTrees.push(tree);
    }

    // Update campaign counters
    await campaignRepository.incrementSponsoredCount(campaign.id, quantity);

    // Award Green Points (100 pts per tree)
    const pointsEarned = quantity * GREEN_POINTS_RULES.TREE_SPONSORED;
    await rewardRepository.addPoints({
      userId: data.donorId,
      points: pointsEarned,
      type: "TREE_SPONSORED",
      referenceType: "CAMPAIGN",
      referenceId: campaign.id,
      description: `Sponsorship of ${quantity} native tree(s) in '${campaign.name}'`,
    });

    // Award First Seed badge if applicable
    const myTrees = await treeRepository.findByDonorId(data.donorId, {});
    if (myTrees.trees.length >= 1) {
      await rewardRepository.awardBadge(data.donorId, 1);
    }
    if (myTrees.trees.length >= 5) {
      await rewardRepository.awardBadge(data.donorId, 2);
    }

    // Send in-app notification
    await notificationRepository.create({
      userId: data.donorId,
      type: "TREE_PLANTED",
      title: "🌱 Tree Sponsorship Confirmed!",
      message: `You have successfully sponsored ${quantity} native tree(s). Your Tree ID is ${createdTrees[0].tree_code}.`,
      data: { treeCodes: createdTrees.map((t) => t.tree_code) },
    });

    // Audit log
    await auditRepository.log({
      userId: data.donorId,
      action: "SPONSOR_TREE",
      entityType: "CAMPAIGN",
      entityId: campaign.id,
      newValues: { quantity, pointsEarned },
      ipAddress: data.ipAddress,
    });

    return {
      trees: createdTrees,
      pointsEarned,
      campaignName: campaign.name,
    };
  }
}

export const sponsorshipService = new SponsorshipService();
