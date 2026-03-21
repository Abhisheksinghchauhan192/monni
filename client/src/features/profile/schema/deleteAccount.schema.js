import { z } from "zod";
/* Delete Account Schema */
export const deleteAccountSchema = z.object({
  confirmation: z.literal("DELETE MY ACCOUNT", {
    message: "You must type DELETE MY ACCOUNT to confirm",
  }),
});
