import { z } from "zod";

export const expenseUpdateSchema = z
  .object({
    expense_date: z.string(),
    amount: z.number().positive(),
    category: z.string().min(2),
    payment_method: z.string(),
    description: z.string(),
    merchant:z.string()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "atleas one field must be provided for update ",
  });
