import { z } from "zod";

export const dateRangeSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});

export const breakdownSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  by: z.enum(["category", "payment_method"]),
});

export const trendSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  interval: z.enum(["day", "month"]).default("month"),
});

export const dashboardSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  by: z.enum(["category", "payment_method"]).default("category"),
});
