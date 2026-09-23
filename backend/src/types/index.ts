import { Request } from "express";
import { UserRole, OrganizationType, OrgVerificationStatus } from "../constants/roles.js";
import { TreeStatus, TreeVerificationStatus, TreeSurvivalStatus, CampaignStatus } from "../constants/tree-status.js";

export interface JwtPayload {
  userId: number;
  uuid: string;
  email: string;
  role: UserRole;
  fullName: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface UserEntity {
  id: number;
  uuid: string;
  full_name: string;
  email: string;
  password_hash: string;
  phone?: string | null;
  city: string;
  role: UserRole;
  avatar_url?: string | null;
  status: "active" | "suspended" | "pending" | "deleted";
  green_points: number;
  email_verified_at?: Date | null;
  last_login_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationEntity {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  type: OrganizationType;
  description?: string;
  logo_url?: string;
  website?: string;
  email: string;
  phone?: string;
  address?: string;
  city: string;
  verification_status: OrgVerificationStatus;
  verified_at?: Date | null;
  created_by?: number | null;
  created_at: Date;
  updated_at: Date;
}

export interface CampaignEntity {
  id: number;
  uuid: string;
  organization_id: number;
  name: string;
  slug: string;
  description: string;
  mission?: string;
  cover_image_url?: string;
  city: string;
  area: string;
  target_trees: number;
  sponsored_trees: number;
  planted_trees: number;
  verified_trees: number;
  surviving_trees: number;
  price_per_tree: number;
  start_date: string;
  end_date: string;
  status: CampaignStatus;
  created_by?: number;
  created_at: Date;
  updated_at: Date;
}

export interface TreeEntity {
  id: number;
  uuid: string;
  tree_code: string;
  donor_id: number;
  campaign_id: number;
  organization_id: number;
  species_id: number;
  campaign_location_id?: number | null;
  plantation_team_id?: number | null;
  city: string;
  area: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status: TreeStatus;
  verification_status: TreeVerificationStatus;
  survival_status: TreeSurvivalStatus;
  current_height_cm?: number;
  dedication_message?: string | null;
  sponsored_at: Date;
  assigned_at?: Date | null;
  planted_at?: Date | null;
  verified_at?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface PlantationProofEntity {
  id: number;
  tree_id: number;
  submitted_by: number;
  image_url: string;
  plantation_date: string;
  latitude: number;
  longitude: number;
  soil_condition?: string;
  notes?: string;
  status: "pending" | "approved" | "rejected" | "changes_requested";
  verified_by?: number | null;
  verified_at?: Date | null;
  rejection_reason?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CertificateEntity {
  id: number;
  uuid: string;
  certificate_number: string;
  tree_id: number;
  donor_id: number;
  campaign_id: number;
  organization_id: number;
  verification_hash: string;
  qr_code_url?: string;
  issued_at: Date;
  status: "active" | "revoked";
  certificate_url?: string;
  created_at: Date;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
