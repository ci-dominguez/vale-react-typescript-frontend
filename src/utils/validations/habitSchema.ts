import { z } from 'zod';

export const HabitFormSchema = z.object({
  name: z
    .string()
    .min(1, 'A habit needs a name')
    .max(75, 'Habit name must be less than 75 characters'),
  description: z
    .string()
    .min(1, 'A description is just a note for yourself')
    .max(125, 'Habit description must be less than 250 characters'),
  goal: z.coerce.number().min(1, 'Goal must be greater than 0'),
});

export const DeleteHabitSchema = z.object({
  habitID: z.string().uuid(),
});

export type DeleteHabitData = z.infer<typeof DeleteHabitSchema>;

export type HabitData = z.infer<typeof HabitFormSchema>;
