import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import { Habit } from '../utils/types';

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
    habitsError,
    areHabitsLoading,
  };
};

export default useHabits;
