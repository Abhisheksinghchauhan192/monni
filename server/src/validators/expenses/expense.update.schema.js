import { z } from "zod";

export const expenseUpdateSchema = z
  .object({
    expense_date: z.string().optional(),
    amount: z.number().positive().optional(),
    category: z.string().min(2).optional(),
    payment_method: z.string().optional(),
    description: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "atleas one field must be provided for update ",
  });
