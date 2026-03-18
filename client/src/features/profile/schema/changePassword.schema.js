import {z} from "zod";


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

