import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).trim(),

  email: z
    .string().trim()
    .email()
    .transform((email) => email.toLowerCase()),

  password: z
    .string().trim()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z
    .string().trim()
    .email()
    .transform((email) => email.toLowerCase()),

  password: z.string().min(6),
});
