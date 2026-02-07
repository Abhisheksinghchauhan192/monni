import { z } from "zod";

export const expenseCursorQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 20))
    .refine((v) => v > 0 && v <= 100, {
      message: "Limit must be between 1 and 100",
    }),
  cursor: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : null)),
  category: z.string().optional(),
  payment_method: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});
