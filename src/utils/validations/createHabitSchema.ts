import { z } from 'zod';

export const createHabitSchema = z.object({
  name: z
    .string()
    .min(1, 'A habit needs a name')
    .max(75, 'Habit name must be less than 75 characters'),
  description: z
    .string()
    .min(1, 'A description is just a note for yourself')
    .max(125, 'Habit description must be less than 250 characters'),
});

export type CreateHabitData = z.infer<typeof createHabitSchema>;
