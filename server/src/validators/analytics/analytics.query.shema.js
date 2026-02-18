import { z } from "zod";

export const dateRangeSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export const breakdownSchema = dateRangeSchema.extend({
  by: z.enum(["category", "payment_method"]),
});

export const trendSchema = z.object({
  from: z.string(),
  to: z.string(),
  interval: z.enum(["day", "month"]),
});
