import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import { Habit } from '../utils/types';
import { ModifyHabitData } from '../utils/validations/habitSchema';

const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsError, setHabitsError] = useState<string | null>(null);
  const [areHabitsLoading, setAreHabitsLoading] = useState(false);

  const { getToken } = useAuth();

  const deleteHabit = useCallback(
    async (habitID: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const token = await getToken();

        await api.delete(`/habits?habit=${habitID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state by filtering out the deleted habit
        setHabits((prev) => prev.filter((habit) => habit.habit_id !== habitID));

        return { success: true };
      } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete habit' };
      }
    },
    [getToken]
  );

  const modifyHabit = useCallback(
    async (
      data: ModifyHabitData
    ): Promise<{ updatedHabit: Habit; success: boolean; error?: string }> => {
      let updatedHabit: Habit = {
        habit_id: '',
        user_id: '',
        name: '',
        description: '',
        created_at: new Date(),
        goal: 0,
        color: '',
      };

      try {
        const token = await getToken();

        const resp = await api.patch(
          `/habits?habit=${data.habitID}`,
          {
            name: data.name,
            description: data.description,
            goal: data.goal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        updatedHabit = resp.data;

        // Update state by replacing the modified habit
        setHabits((prev) =>
          prev.map((habit) =>
            habit.habit_id === updatedHabit.habit_id ? updatedHabit : habit
          )
        );

        return { updatedHabit: updatedHabit, success: true };
      } catch (error) {
        console.error(error);
        return {
          updatedHabit: updatedHabit,
          success: false,
          error: 'Failed to modify habit',
        };
      }
    },
    [getToken]
  );

  const fetchHabits = useCallback(async () => {
    setAreHabitsLoading(true);
    setHabitsError(null);
    try {
      const token = await getToken();

      const resp = await api.get('/habits', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHabits(resp.data);
    } catch (error) {
      setHabitsError(`Failed to fetch habits: ${error}`);
    } finally {
      setAreHabitsLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {
    habits,
    setHabits,
    deleteHabit,
    modifyHabit,
    habitsError,
    areHabitsLoading,
  };
};

export default useHabits;
