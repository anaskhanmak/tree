import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  area: z.string().min(2, "Area is required"),
  targetTrees: z.number().int().positive("Target trees must be a positive integer"),
  pricePerTree: z.number().positive("Price per tree must be greater than 0"),
  startDate: z.string(),
  endDate: z.string(),
});
