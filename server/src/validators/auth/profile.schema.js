import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2).trim().optional(),
  mobile: z.string().min(10).max(15).optional(),
  // Add other fields as necessary, but keep it basic for now
});
