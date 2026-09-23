import { z } from "zod";

export const sponsorTreeSchema = z.object({
  campaignId: z.number().int().positive("Valid campaign ID is required"),
  speciesId: z.number().int().positive("Valid species ID is required"),
  quantity: z.number().int().min(1).max(100).default(1),
  dedicationMessage: z.string().max(255).optional(),
});
