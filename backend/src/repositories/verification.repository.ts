import { db } from "../database/connection.js";
import { PlantationProofEntity } from "../types/index.js";

export class VerificationRepository {
  async submitProof(data: {
    treeId: number;
    submittedBy: number;
    imageUrl: string;
    plantationDate: string;
    latitude: number;
    longitude: number;
    soilCondition?: string;
    notes?: string;
  }): Promise<PlantationProofEntity> {
    const result = await db.execute(
      `INSERT INTO plantation_proofs (tree_id, submitted_by, image_url, plantation_date, latitude, longitude, soil_condition, notes, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
       ON DUPLICATE KEY UPDATE image_url = VALUES(image_url), latitude = VALUES(latitude), longitude = VALUES(longitude), notes = VALUES(notes), status = 'pending'`,
      [
        data.treeId,
        data.submittedBy,
        data.imageUrl,
        data.plantationDate,
        data.latitude,
        data.longitude,
        data.soilCondition || null,
        data.notes || null,
      ]
    );

    const rows = await db.query<PlantationProofEntity>(
      "SELECT * FROM plantation_proofs WHERE tree_id = ? LIMIT 1",
      [data.treeId]
    );
    return (
      rows[0] || {
        id: result.insertId,
        tree_id: data.treeId,
        submitted_by: data.submittedBy,
        image_url: data.imageUrl,
        plantation_date: data.plantationDate,
        latitude: data.latitude,
        longitude: data.longitude,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      }
    );
  }

  async findByTreeId(treeId: number): Promise<PlantationProofEntity | null> {
    const rows = await db.query<PlantationProofEntity>(
      "SELECT * FROM plantation_proofs WHERE tree_id = ? LIMIT 1",
      [treeId]
    );
    return rows[0] || null;
  }

  async getPendingProofs(): Promise<any[]> {
    return await db.query(
      `SELECT p.*, t.tree_code, t.city, t.area, sp.name as species_name, c.name as campaign_name, u.full_name as submitter_name
       FROM plantation_proofs p
       JOIN trees t ON p.tree_id = t.id
       JOIN tree_species sp ON t.species_id = sp.id
       JOIN campaigns c ON t.campaign_id = c.id
       JOIN users u ON p.submitted_by = u.id
       WHERE p.status = 'pending'
       ORDER BY p.id ASC`
    );
  }

  async updateProofStatus(
    proofId: number,
    status: "approved" | "rejected" | "changes_requested",
    verifiedBy: number,
    rejectionReason?: string
  ): Promise<void> {
    await db.execute(
      `UPDATE plantation_proofs
       SET status = ?, verified_by = ?, verified_at = NOW(), rejection_reason = ?
       WHERE id = ?`,
      [status, verifiedBy, rejectionReason || null, proofId]
    );
  }
}

export const verificationRepository = new VerificationRepository();
