import { db } from "../database/connection.js";
import { TreeEntity } from "../types/index.js";
import { TreeStatus, TreeVerificationStatus, TreeSurvivalStatus } from "../constants/tree-status.js";
import crypto from "crypto";

export class TreeRepository {
  async findById(id: number): Promise<TreeEntity | null> {
    const rows = await db.query<TreeEntity>(
      "SELECT * FROM trees WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0] || null;
  }

  async findByTreeCode(treeCode: string): Promise<TreeEntity | null> {
    const rows = await db.query<TreeEntity>(
      "SELECT * FROM trees WHERE tree_code = ? LIMIT 1",
      [treeCode.trim()]
    );
    return rows[0] || null;
  }

  async countByCity(city: string): Promise<number> {
    const rows = await db.query<{ count: number }>(
      "SELECT COUNT(*) as count FROM trees WHERE city = ?",
      [city]
    );
    return rows[0]?.count || 0;
  }

  async countTotal(): Promise<number> {
    const rows = await db.query<{ count: number }>("SELECT COUNT(*) as count FROM trees");
    return rows[0]?.count || 0;
  }

  async findByDonorId(donorId: number, params: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ trees: TreeEntity[]; total: number }> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM trees WHERE donor_id = ?";
    const queryParams: any[] = [donorId];

    if (params.status) {
      query += " AND status = ?";
      queryParams.push(params.status);
    }

    if (params.search) {
      query += " AND (tree_code LIKE ? OR city LIKE ? OR area LIKE ?)";
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const rows = await db.query<TreeEntity>(query, queryParams);
    return { trees: rows, total: rows.length };
  }

  async findAll(params: {
    status?: string;
    verificationStatus?: string;
    city?: string;
    campaignId?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ trees: TreeEntity[]; total: number }> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM trees WHERE 1=1";
    const queryParams: any[] = [];

    if (params.status) {
      query += " AND status = ?";
      queryParams.push(params.status);
    }

    if (params.verificationStatus) {
      query += " AND verification_status = ?";
      queryParams.push(params.verificationStatus);
    }

    if (params.city) {
      query += " AND city = ?";
      queryParams.push(params.city);
    }

    if (params.campaignId) {
      query += " AND campaign_id = ?";
      queryParams.push(params.campaignId);
    }

    if (params.search) {
      query += " AND (tree_code LIKE ? OR city LIKE ? OR area LIKE ?)";
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const rows = await db.query<TreeEntity>(query, queryParams);
    return { trees: rows, total: rows.length };
  }

  async create(data: {
    treeCode: string;
    donorId: number;
    campaignId: number;
    organizationId: number;
    speciesId: number;
    city: string;
    area: string;
    dedicationMessage?: string;
    plantationTeamId?: number;
  }): Promise<TreeEntity> {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO trees (uuid, tree_code, donor_id, campaign_id, organization_id, species_id, plantation_team_id, city, area, status, verification_status, survival_status, dedication_message, sponsored_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'sponsored', 'pending', 'unknown', ?, NOW(), NOW())`,
      [
        uuid,
        data.treeCode,
        data.donorId,
        data.campaignId,
        data.organizationId,
        data.speciesId,
        data.plantationTeamId || null,
        data.city,
        data.area,
        data.dedicationMessage || null,
      ]
    );

    const created = await this.findById(result.insertId);
    return (
      created || {
        id: result.insertId,
        uuid,
        tree_code: data.treeCode,
        donor_id: data.donorId,
        campaign_id: data.campaignId,
        organization_id: data.organizationId,
        species_id: data.speciesId,
        city: data.city,
        area: data.area,
        status: TreeStatus.SPONSORED,
        verification_status: TreeVerificationStatus.PENDING,
        survival_status: TreeSurvivalStatus.UNKNOWN,
        sponsored_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
  }

  async updateStatus(
    id: number,
    status: TreeStatus,
    verificationStatus?: TreeVerificationStatus,
    coordinates?: { latitude: number; longitude: number }
  ): Promise<void> {
    let query = "UPDATE trees SET status = ?, updated_at = NOW()";
    const params: any[] = [status];

    if (verificationStatus) {
      query += ", verification_status = ?";
      params.push(verificationStatus);
      if (verificationStatus === TreeVerificationStatus.VERIFIED) {
        query += ", verified_at = NOW()";
      }
    }

    if (status === TreeStatus.PLANTED) {
      query += ", planted_at = NOW()";
    }

    if (coordinates) {
      query += ", latitude = ?, longitude = ?";
      params.push(coordinates.latitude, coordinates.longitude);
    }

    query += " WHERE id = ?";
    params.push(id);

    await db.execute(query, params);
  }
}

export const treeRepository = new TreeRepository();
