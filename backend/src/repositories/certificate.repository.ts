import { db } from "../database/connection.js";
import { CertificateEntity } from "../types/index.js";
import crypto from "crypto";

export class CertificateRepository {
  async findById(id: number): Promise<CertificateEntity | null> {
    const rows = await db.query<CertificateEntity>(
      "SELECT * FROM certificates WHERE id = ? LIMIT 1",
      [id]
    );
    return rows[0] || null;
  }

  async findByCertificateNumber(certificateNumber: string): Promise<any | null> {
    const rows = await db.query(
      `SELECT c.*, t.tree_code, t.city, t.area, sp.name as species_name, sp.scientific_name,
              camp.name as campaign_name, o.name as organization_name, u.full_name as donor_name
       FROM certificates c
       JOIN trees t ON c.tree_id = t.id
       JOIN tree_species sp ON t.species_id = sp.id
       JOIN campaigns camp ON c.campaign_id = camp.id
       JOIN organizations o ON c.organization_id = o.id
       JOIN users u ON c.donor_id = u.id
       WHERE c.certificate_number = ? AND c.status = 'active'
       LIMIT 1`,
      [certificateNumber.trim()]
    );
    return rows[0] || null;
  }

  async findByDonorId(donorId: number): Promise<any[]> {
    return await db.query(
      `SELECT c.*, t.tree_code, t.city, sp.name as species_name, camp.name as campaign_name, o.name as organization_name
       FROM certificates c
       JOIN trees t ON c.tree_id = t.id
       JOIN tree_species sp ON t.species_id = sp.id
       JOIN campaigns camp ON c.campaign_id = camp.id
       JOIN organizations o ON c.organization_id = o.id
       WHERE c.donor_id = ?
       ORDER BY c.id DESC`,
      [donorId]
    );
  }

  async create(data: {
    certificateNumber: string;
    treeId: number;
    donorId: number;
    campaignId: number;
    organizationId: number;
  }): Promise<CertificateEntity> {
    const uuid = crypto.randomUUID();
    const verificationHash = "0x" + crypto.createHash("sha256").update(`${data.certificateNumber}-${data.treeId}-${Date.now()}`).digest("hex");

    const result = await db.execute(
      `INSERT INTO certificates (uuid, certificate_number, tree_id, donor_id, campaign_id, organization_id, verification_hash, status, issued_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
      [
        uuid,
        data.certificateNumber,
        data.treeId,
        data.donorId,
        data.campaignId,
        data.organizationId,
        verificationHash,
      ]
    );

    const created = await this.findById(result.insertId);
    return (
      created || {
        id: result.insertId,
        uuid,
        certificate_number: data.certificateNumber,
        tree_id: data.treeId,
        donor_id: data.donorId,
        campaign_id: data.campaignId,
        organization_id: data.organizationId,
        verification_hash: verificationHash,
        status: "active",
        issued_at: new Date(),
        created_at: new Date(),
      }
    );
  }
}

export const certificateRepository = new CertificateRepository();
