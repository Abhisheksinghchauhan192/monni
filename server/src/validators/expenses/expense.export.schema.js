import { z } from "zod";

export const expenseExportSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
});
