import { z } from "zod";

/* Update Profile Schema */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .optional(),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
    .optional(),
});

/* Change Password Schema */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password required"),

  newPassword:  z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),

  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),  
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/* Delete Account Schema */
export const deleteAccountSchema = z.object({
  confirmation: z.literal("DELETE MY ACCOUNT", {
    errorMap: () => ({
      message: "You must type DELETE MY ACCOUNT to confirm",
    }),
  }),
});
