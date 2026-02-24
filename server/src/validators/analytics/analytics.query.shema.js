import { z } from "zod";

export const dashboardQuerySchema = z.object({
  mode: z.enum(["overall", "monthly", "yearly", "custom"]),

  year: z.coerce.number().optional(),
  month: z.coerce.number().optional(),

  from: z.string().optional(),
  to: z.string().optional(),

  by: z.enum(["category", "payment_method"]),
});
