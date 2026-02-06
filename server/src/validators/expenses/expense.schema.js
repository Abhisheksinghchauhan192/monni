import { z } from "zod";

export const expenseCreateSchema = z.object({
  expense_date: z.string(),
  amount: z.number().positive(),
  category: z.string().min(2),
  merchant: z.string().optional(),
  payment_method: z.string().optional(),
  description: z.string().optional(),
});
