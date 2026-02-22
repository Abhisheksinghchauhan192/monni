import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters")
      .regex(/[A-Za-z]/, "Must Contain at least one letter")
      .regex(/[0-9]/, "Must Contain at least one Number")
      .regex(/[^0-9a-zA-Z]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not matched",
    path: ["confirmPassword"],
  });
