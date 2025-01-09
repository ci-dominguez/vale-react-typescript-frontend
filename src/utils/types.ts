export interface User {
  user_id: string;
  clerk_id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface Habit {
  habit_id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: Date;
  goal: number;
  color: string;
}

export interface HabitRecord {
  record_id: number;
  habit_id: string;
  date: string;
  is_completed: boolean;
}
