/**
 * Central Brand Configuration File for TreeMint
 * Allows instant white-labeling or rebranding from a single source.
 */

export const siteConfig = {
  name: "TreeMint",
  tagline: "Sponsor. Plant. Grow.",
  headline: "Sponsor a Tree. Track Its Journey.",
  description:
    "A digital tree sponsorship, plantation verification & lifecycle tracking platform connecting donors, organizations, and verified field plantation teams.",
  contactEmail: "support@treemint.org",
  location: "Karachi, Pakistan",
  currencySymbol: "PKR",
  defaultTreeCost: 1500, // PKR per native tree sapling + 2-year maintenance
  links: {
    github: "https://github.com/treemint/treemint-platform",
    twitter: "https://twitter.com/treemint_eco",
    linkedin: "https://linkedin.com/company/treemint",
  },
  stats: {
    treesSponsored: 25430,
    treesPlanted: 21850,
    treesVerified: 18420,
    treesSurviving: 17260,
    activeCampaigns: 45,
    partnerOrgs: 28,
    survivalRate: 93.8,
    co2OffsetTonnes: 540,
  },
  colors: {
    primaryGreen: "#15803D",
    darkGreen: "#166534",
    lightGreen: "#DCFCE7",
    accent: "#84CC16",
    bg: "#F8FAFC",
    text: "#0F172A",
    muted: "#64748B",
  },
};
