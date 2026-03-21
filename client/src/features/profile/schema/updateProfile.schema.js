import {z} from "zod";
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