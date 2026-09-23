import { db } from "../database/connection.js";
import { UserEntity } from "../types/index.js";
import { UserRole } from "../constants/roles.js";
import crypto from "crypto";

export class UserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const rows = await db.query<UserEntity>(
      "SELECT * FROM users WHERE email = ? AND status != 'deleted' LIMIT 1",
      [email.toLowerCase().trim()]
    );
    return rows[0] || null;
  }

  async findById(id: number): Promise<UserEntity | null> {
    const rows = await db.query<UserEntity>(
      "SELECT * FROM users WHERE id = ? AND status != 'deleted' LIMIT 1",
      [id]
    );
    return rows[0] || null;
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const rows = await db.query<UserEntity>(
      "SELECT * FROM users WHERE uuid = ? AND status != 'deleted' LIMIT 1",
      [uuid]
    );
    return rows[0] || null;
  }

  async create(data: {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    city: string;
    role: UserRole;
  }): Promise<UserEntity> {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO users (uuid, full_name, email, password_hash, phone, city, role, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [
        uuid,
        data.fullName,
        data.email.toLowerCase().trim(),
        data.passwordHash,
        data.phone || null,
        data.city,
        data.role,
      ]
    );

    const created = await this.findById(result.insertId);
    if (!created) {
      // Fallback for simulation
      return {
        id: result.insertId,
        uuid,
        full_name: data.fullName,
        email: data.email,
        password_hash: data.passwordHash,
        phone: data.phone,
        city: data.city,
        role: data.role,
        status: "active",
        green_points: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }
    return created;
  }

  async updatePoints(userId: number, pointsDelta: number): Promise<void> {
    await db.execute(
      "UPDATE users SET green_points = GREATEST(0, green_points + ?) WHERE id = ?",
      [pointsDelta, userId]
    );
  }

  async findAll(params: {
    role?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ users: UserEntity[]; total: number }> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = "SELECT id, uuid, full_name, email, phone, city, role, status, green_points, created_at FROM users WHERE status != 'deleted'";
    const queryParams: any[] = [];

    if (params.role) {
      query += " AND role = ?";
      queryParams.push(params.role);
    }

    if (params.search) {
      query += " AND (full_name LIKE ? OR email LIKE ? OR city LIKE ?)";
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const rows = await db.query<UserEntity>(query, queryParams);
    return { users: rows, total: rows.length };
  }
}

export const userRepository = new UserRepository();
