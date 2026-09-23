import { db } from "../database/connection.js";
import crypto from "crypto";

export class NotificationRepository {
  async create(data: {
    userId: number;
    type: string;
    title: string;
    message: string;
    data?: any;
  }) {
    const uuid = crypto.randomUUID();
    await db.execute(
      `INSERT INTO notifications (uuid, user_id, type, title, message, data, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        uuid,
        data.userId,
        data.type,
        data.title,
        data.message,
        data.data ? JSON.stringify(data.data) : null,
      ]
    );
  }

  async findByUserId(userId: number) {
    return await db.query(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 50",
      [userId]
    );
  }

  async markAsRead(id: number, userId: number) {
    await db.execute(
      "UPDATE notifications SET read_at = NOW() WHERE id = ? AND user_id = ?",
      [id, userId]
    );
  }

  async markAllAsRead(userId: number) {
    await db.execute(
      "UPDATE notifications SET read_at = NOW() WHERE user_id = ? AND read_at IS NULL",
      [userId]
    );
  }
}

export const notificationRepository = new NotificationRepository();
