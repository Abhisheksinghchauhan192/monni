import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2).max(50),
  emoji: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(2).max(50).optional(),
  emoji: z.string().optional(),
});