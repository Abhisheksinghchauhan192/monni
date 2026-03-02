import { z } from "zod";

export const expenseUpdateSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, "Please provide a brief description (at least 3 characters)."),
  merchant: z
  .string()
  .trim()
  .min(3, "Please enter the merchant or store name."),
  amount: z.coerce
    .number({
      required_error: "An expense amount is required.",
      invalid_type_error:
        "Please enter a valid number for the amount (e.g., 15.50).",
    })
    .positive("The expense amount must be greater than zero."),
  expense_date: z
    .string()
    .min(1, "Please select the date the expense occurred."),
  category: z.string().min(1, "Please choose a category for this expense."),
  payment_method: z
    .string()
    .min(1, "Please select how you paid for this expense."),
});

