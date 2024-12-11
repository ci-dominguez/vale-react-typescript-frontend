import { Habit, HabitRecord } from '../types';

export const mockHabits: Habit[] = [
  {
    habit_id: '1',
    user_id: 'user123',
    name: 'Exercise',
    description: 'Morning workout routine',
    total_completions: 5,
    created_at: new Date('2024-01-01'),
  },
];

export const mockHabitRecords: HabitRecord[] = [
  {
    record_id: 1,
    habit_id: '1',
    date: new Date('2024-12-01'),
    is_completed: true,
  },
];
