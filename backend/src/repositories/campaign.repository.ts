import { db } from "../database/connection.js";
import { CampaignEntity } from "../types/index.js";
import { CampaignStatus } from "../constants/tree-status.js";
import crypto from "crypto";

export class CampaignRepository {
  async findById(id: number): Promise<CampaignEntity | null> {
    const rows = await db.query<CampaignEntity>(
      "SELECT * FROM campaigns WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0] || null;
  }

  async findBySlug(slug: string): Promise<CampaignEntity | null> {
    const rows = await db.query<CampaignEntity>(
      "SELECT * FROM campaigns WHERE slug = ? LIMIT 1",
      [slug]
    );
    return rows[0] || null;
  }

  async findAll(params: {
    city?: string;
    status?: CampaignStatus;
    organizationId?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ campaigns: CampaignEntity[]; total: number }> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM campaigns WHERE 1=1";
    const queryParams: any[] = [];

    if (params.city) {
      query += " AND city = ?";
      queryParams.push(params.city);
    }

    if (params.status) {
      query += " AND status = ?";
      queryParams.push(params.status);
    }

    if (params.organizationId) {
      query += " AND organization_id = ?";
      queryParams.push(params.organizationId);
    }

    if (params.search) {
      query += " AND (name LIKE ? OR description LIKE ? OR city LIKE ?)";
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    query += " ORDER BY id DESC LIMIT ? OFFSET ?";
    queryParams.push(limit, offset);

    const rows = await db.query<CampaignEntity>(query, queryParams);
    return { campaigns: rows, total: rows.length };
  }

  async incrementSponsoredCount(campaignId: number, count: number = 1): Promise<void> {
    await db.execute(
      "UPDATE campaigns SET sponsored_trees = sponsored_trees + ? WHERE id = ?",
      [count, campaignId]
    );
  }

  async incrementVerifiedCount(campaignId: number, count: number = 1): Promise<void> {
    await db.execute(
      "UPDATE campaigns SET verified_trees = verified_trees + ?, planted_trees = planted_trees + ? WHERE id = ?",
      [count, count, campaignId]
    );
  }

  async create(data: {
    organizationId: number;
    name: string;
    slug: string;
    description: string;
    city: string;
    area: string;
    targetTrees: number;
    pricePerTree: number;
    startDate: string;
    endDate: string;
    createdBy?: number;
  }): Promise<CampaignEntity> {
    const uuid = crypto.randomUUID();
    const result = await db.execute(
      `INSERT INTO campaigns (uuid, organization_id, name, slug, description, city, area, target_trees, price_per_tree, start_date, end_date, status, created_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, NOW())`,
      [
        uuid,
        data.organizationId,
        data.name,
        data.slug,
        data.description,
        data.city,
        data.area,
        data.targetTrees,
        data.pricePerTree,
        data.startDate,
        data.endDate,
        data.createdBy || null,
      ]
    );

    const created = await this.findById(result.insertId);
    return (
      created || {
        id: result.insertId,
        uuid,
        organization_id: data.organizationId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        city: data.city,
        area: data.area,
        target_trees: data.targetTrees,
        sponsored_trees: 0,
        planted_trees: 0,
        verified_trees: 0,
        surviving_trees: 0,
        price_per_tree: data.pricePerTree,
        start_date: data.startDate,
        end_date: data.endDate,
        status: CampaignStatus.ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
  }
}

export const campaignRepository = new CampaignRepository();
