import { db } from "../database/connection.js";

export class AuditRepository {
  async log(data: {
    userId?: number;
    action: string;
    entityType: string;
    entityId?: number;
    oldValues?: any;
    newValues?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      await db.execute(
        `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          data.userId || null,
          data.action,
          data.entityType,
          data.entityId || null,
          data.oldValues ? JSON.stringify(data.oldValues) : null,
          data.newValues ? JSON.stringify(data.newValues) : null,
          data.ipAddress || null,
          data.userAgent || null,
        ]
      );
    } catch {
      // Audit failure should never crash the main transaction
    }
  }

  async getRecentLogs(limit: number = 25) {
    return await db.query(
      `SELECT a.*, u.full_name as user_name, u.email as user_email
       FROM audit_logs a
       LEFT JOIN users u ON a.user_id = u.id
       ORDER BY a.id DESC LIMIT ?`,
      [limit]
    );
  }
}

export const auditRepository = new AuditRepository();
