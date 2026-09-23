import { db } from "../database/connection.js";
import { OrganizationEntity } from "../types/index.js";
import { OrgVerificationStatus, OrganizationType } from "../constants/roles.js";
import crypto from "crypto";

export class OrganizationRepository {
  async findById(id: number): Promise<OrganizationEntity | null> {
    const rows = await db.query<OrganizationEntity>(
      "SELECT * FROM organizations WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0] || null;
  }

  async findBySlug(slug: string): Promise<OrganizationEntity | null> {
    const rows = await db.query<OrganizationEntity>(
      "SELECT * FROM organizations WHERE slug = ? LIMIT 1",
      [slug]
    );
    return rows[0] || null;
  }

  async findAll(params: {
    type?: OrganizationType;
    status?: OrgVerificationStatus;
    search?: string;
  }): Promise<OrganizationEntity[]> {
    let query = "SELECT * FROM organizations WHERE 1=1";
    const queryParams: any[] = [];

    if (params.type) {
      query += " AND type = ?";
      queryParams.push(params.type);
    }

    if (params.status) {
      query += " AND verification_status = ?";
      queryParams.push(params.status);
    }

    if (params.search) {
      query += " AND (name LIKE ? OR city LIKE ?)";
      const term = `%${params.search}%`;
      queryParams.push(term, term);
    }

    query += " ORDER BY id DESC";
    return await db.query<OrganizationEntity>(query, queryParams);
  }

  async create(data: {
    name: string;
    slug: string;
    type: OrganizationType;
    description: string;
    email: string;
    city: string;
    createdBy?: number;
  }): Promise<OrganizationEntity> {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO organizations (uuid, name, slug, type, description, email, city, verification_status, created_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, NOW())`,
      [uuid, data.name, data.slug, data.type, data.description, data.email, data.city, data.createdBy || null]
    );

    const created = await this.findById(result.insertId);
    return (
      created || {
        id: result.insertId,
        uuid,
        name: data.name,
        slug: data.slug,
        type: data.type,
        description: data.description,
        email: data.email,
        city: data.city,
        verification_status: OrgVerificationStatus.PENDING,
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
  }

  async updateVerification(id: number, status: OrgVerificationStatus): Promise<void> {
    await db.execute(
      "UPDATE organizations SET verification_status = ?, verified_at = IF(? = 'verified', NOW(), verified_at) WHERE id = ?",
      [status, status, id]
    );
  }
}

export const organizationRepository = new OrganizationRepository();
