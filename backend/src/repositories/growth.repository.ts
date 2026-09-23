import { db } from "../database/connection.js";
import crypto from "crypto";

export class GrowthRepository {
  async addGrowthUpdate(data: {
    treeId: number;
    submittedBy: number;
    monthMilestone: string;
    updateDate: string;
    heightCm: number;
    healthStatus: string;
    imageUrl: string;
    notes?: string;
  }) {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO tree_growth_updates (uuid, tree_id, submitted_by, month_milestone, update_date, height_cm, health_status, image_url, notes, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'verified', NOW())`,
      [
        uuid,
        data.treeId,
        data.submittedBy,
        data.monthMilestone,
        data.updateDate,
        data.heightCm,
        data.healthStatus,
        data.imageUrl,
        data.notes || null,
      ]
    );

    // Update tree's latest height
    await db.execute(
      "UPDATE trees SET current_height_cm = ?, updated_at = NOW() WHERE id = ?",
      [data.heightCm, data.treeId]
    );

    return { id: result.insertId, uuid, ...data };
  }

  async findByTreeId(treeId: number) {
    return await db.query(
      "SELECT * FROM tree_growth_updates WHERE tree_id = ? ORDER BY id ASC",
      [treeId]
    );
  }
}

export const growthRepository = new GrowthRepository();
