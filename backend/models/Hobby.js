import { z } from 'zod';

export const HobbySchema = z.object({
  name: z.string().min(1),
  category: z.string(),
  difficulty: z.string(),
  progress: z.number().default(0),
  completed: z.boolean().default(false),
  proofUrl: z.string().url().optional()
});
