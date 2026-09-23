import { db } from "../database/connection.js";

export class RewardRepository {
  async addPoints(data: {
    userId: number;
    points: number;
    type: string;
    referenceType?: string;
    referenceId?: number;
    description: string;
  }) {
    await db.execute(
      `INSERT INTO green_points (user_id, points, type, reference_type, reference_id, description, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        data.userId,
        data.points,
        data.type,
        data.referenceType || null,
        data.referenceId || null,
        data.description,
      ]
    );

    // Increment user's aggregate points
    await db.execute(
      "UPDATE users SET green_points = GREATEST(0, green_points + ?) WHERE id = ?",
      [data.points, data.userId]
    );
  }

  async getPointsHistory(userId: number) {
    return await db.query(
      "SELECT * FROM green_points WHERE user_id = ? ORDER BY id DESC",
      [userId]
    );
  }

  async getAllBadges() {
    return await db.query("SELECT * FROM badges WHERE is_active = 1 ORDER BY requirement_value ASC");
  }

  async getUserBadges(userId: number) {
    return await db.query(
      `SELECT b.*, ub.awarded_at
       FROM user_badges ub
       JOIN badges b ON ub.badge_id = b.id
       WHERE ub.user_id = ?
       ORDER BY b.requirement_value ASC`,
      [userId]
    );
  }

  async awardBadge(userId: number, badgeId: number) {
    await db.execute(
      "INSERT IGNORE INTO user_badges (user_id, badge_id, awarded_at) VALUES (?, ?, NOW())",
      [userId, badgeId]
    );
  }
}

export const rewardRepository = new RewardRepository();
