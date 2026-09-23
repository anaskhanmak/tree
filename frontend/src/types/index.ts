export type UserRole = "donor" | "admin" | "organization" | "plantation_team";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  avatar: string;
  points: number;
  treesSponsoredCount: number;
  joinedDate: string;
  status: "active" | "suspended" | "pending";
  organizationId?: string;
  teamId?: string;
}

export type OrgType = "Government" | "NGO" | "Corporate" | "Educational" | "Community";
export type VerificationStatus = "pending" | "verified" | "rejected";

export interface Organization {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: OrgType;
  city: string;
  contactEmail: string;
  phone: string;
  website: string;
  verificationStatus: VerificationStatus;
  joinedDate: string;
  campaignsCount: number;
  treesPlantedTotal: number;
}

export type CampaignStatus = "active" | "completed" | "upcoming" | "paused";

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  organizationId: string;
  organizationName: string;
  organizationType: OrgType;
  organizationLogo: string;
  description: string;
  mission: string;
  coverImage: string;
  city: string;
  area: string;
  targetTrees: number;
  sponsoredTrees: number;
  plantedTrees: number;
  verifiedTrees: number;
  survivingTrees: number;
  pricePerTree: number;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  treeSpecies: string[];
  featured?: boolean;
}

export type TreeLifecycleStage =
  | "sponsored"
  | "assigned"
  | "planted"
  | "verified"
  | "growing"
  | "survival-check";

export interface PlantationProof {
  photoUrl: string;
  plantedAt: string;
  plantedByTeamId: string;
  plantedByTeamName: string;
  gpsCoordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  notes: string;
  soilCondition?: string;
}

export interface GrowthUpdate {
  id: string;
  treeId: string;
  monthMilestone: "Month 1" | "Month 3" | "Month 6" | "Month 12" | "Month 24";
  date: string;
  heightCm: number;
  healthStatus: "Thriving" | "Good" | "Needs Care" | "Dormant";
  imageUrl: string;
  notes: string;
  submittedBy: string;
  verifiedByAdmin: boolean;
}

export interface Tree {
  id: string;
  treeId: string; // E.g. TREE-KHI-2026-00125
  donorId: string;
  donorName: string;
  campaignId: string;
  campaignName: string;
  organizationId: string;
  organizationName: string;
  species: string;
  localName?: string;
  city: string;
  area: string;
  sponsoredDate: string;
  plantationDate?: string;
  status: TreeLifecycleStage;
  verificationStatus: VerificationStatus;
  plantationProof?: PlantationProof;
  currentHeightCm?: number;
  survivalStatus: "Alive & Thriving" | "Healthy" | "Monitored" | "Replaced";
  growthUpdates: GrowthUpdate[];
  certificateId?: string;
  dedicationMessage?: string;
}

export interface PlantationTeam {
  id: string;
  name: string;
  leaderName: string;
  membersCount: number;
  assignedCity: string;
  assignedCampaignIds: string[];
  treesPlanted: number;
  verificationRate: number; // percentage
  status: "active" | "field_duty" | "idle";
  contactPhone: string;
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. CERT-TM-2026-0812
  treeId: string;
  donorId: string;
  donorName: string;
  species: string;
  plantationDate: string;
  location: string;
  campaignId: string;
  campaignName: string;
  organizationName: string;
  verificationHash: string;
  qrCodeUrl: string;
  issueDate: string;
}

export interface RewardBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  icon?: string;
  pointsAwarded: number;
  requirement: string;
  targetCount: number;
  category: "sponsorship" | "milestone" | "community" | "verification";
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  category: "plantation" | "verification" | "growth" | "reward" | "campaign";
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export interface ImpactStats {
  treesSponsored: number;
  treesPlanted: number;
  treesSurviving: number;
  campaignsSupported: number;
  citiesCovered: number;
  co2OffsetKg: number;
  oxygenProducedLitersPerDay: number;
  greenPoints: number;
}
