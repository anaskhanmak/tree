import { db } from "../database/connection.js";
import crypto from "crypto";

export class SponsorshipRepository {
  async create(data: {
    userId: number;
    treeId: number;
    campaignId: number;
    organizationId: number;
    amount: number;
    currency?: string;
    paymentStatus?: string;
    paymentReference?: string;
  }) {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO sponsorships (uuid, user_id, tree_id, campaign_id, organization_id, amount, currency, payment_status, payment_reference, sponsored_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        uuid,
        data.userId,
        data.treeId,
        data.campaignId,
        data.organizationId,
        data.amount,
        data.currency || "PKR",
        data.paymentStatus || "paid",
        data.paymentReference || `TXN-${Date.now()}`,
      ]
    );
    return { id: result.insertId, uuid, ...data };
  }

  async findByUserId(userId: number) {
    return await db.query(
      `SELECT s.*, t.tree_code, c.name as campaign_name, o.name as organization_name
       FROM sponsorships s
       JOIN trees t ON s.tree_id = t.id
       JOIN campaigns c ON s.campaign_id = c.id
       JOIN organizations o ON s.organization_id = o.id
       WHERE s.user_id = ?
       ORDER BY s.id DESC`,
      [userId]
    );
  }
}

export const sponsorshipRepository = new SponsorshipRepository();
