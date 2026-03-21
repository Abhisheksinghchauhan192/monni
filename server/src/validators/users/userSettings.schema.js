import { z } from "zod";

export const updateSettingsSchema = z.object({
  currency: z.string().min(2).max(10).optional(),
  timezone: z.string().min(3).max(50).optional(),
  theme: z.enum(["light", "dark", "system"]).optional(),
});