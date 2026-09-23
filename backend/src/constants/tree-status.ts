export enum TreeStatus {
  SPONSORED = "sponsored",
  ASSIGNED = "assigned",
  PLANTED = "planted",
  VERIFIED = "verified",
  GROWING = "growing",
  SURVIVAL_CHECK = "survival_check",
  DEAD = "dead",
}

export enum TreeVerificationStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  REJECTED = "rejected",
}

export enum TreeSurvivalStatus {
  UNKNOWN = "unknown",
  HEALTHY = "healthy",
  AT_RISK = "at_risk",
  SURVIVING = "surviving",
  DEAD = "dead",
}

export enum CampaignStatus {
  DRAFT = "draft",
  PENDING_APPROVAL = "pending_approval",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// Server-side lifecycle state transition validator
export const VALID_TREE_TRANSITIONS: Record<TreeStatus, TreeStatus[]> = {
  [TreeStatus.SPONSORED]: [TreeStatus.ASSIGNED],
  [TreeStatus.ASSIGNED]: [TreeStatus.PLANTED, TreeStatus.ASSIGNED],
  [TreeStatus.PLANTED]: [TreeStatus.VERIFIED, TreeStatus.ASSIGNED],
  [TreeStatus.VERIFIED]: [TreeStatus.GROWING],
  [TreeStatus.GROWING]: [TreeStatus.SURVIVAL_CHECK, TreeStatus.DEAD],
  [TreeStatus.SURVIVAL_CHECK]: [TreeStatus.GROWING, TreeStatus.DEAD],
  [TreeStatus.DEAD]: [],
};
