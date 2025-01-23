import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import api from '../api/axios';
import { Habit } from '../utils/types';
import {
  CreateHabitData,
  ModifyHabitData,
} from '../utils/validations/habitSchema';
import axios from 'axios';

const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsError, setHabitsError] = useState<string | null>(null);
  const [areHabitsLoading, setAreHabitsLoading] = useState(false);
  const [loadingHabitIDs, setLoadingHabitIDs] = useState<Set<string>>(
    new Set()
  );

  const { getToken } = useAuth();

  const deleteHabit = useCallback(
    async (habitID: string): Promise<{ success: boolean; error?: string }> => {
      try {
        setLoadingHabitIDs((prev) => new Set(prev).add(habitID));

        const token = await getToken();

        await api.delete(`/habits?habit=${habitID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update loading habit IDs
        setLoadingHabitIDs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(habitID);
          return newSet;
        });

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
        setLoadingHabitIDs((prev) => new Set(prev).add(data.habitID));

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

        // Update loading habit IDs
        setLoadingHabitIDs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.habitID);
          return newSet;
        });

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

  const createHabit = useCallback(
    async (
      data: CreateHabitData
    ): Promise<{ newHabit: Habit; success: boolean; error?: string }> => {
      let newHabit: Habit = {
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

        const resp = await api.post('/habits', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(resp.data);

        newHabit = resp.data;

        // Update loading habit IDs
        setLoadingHabitIDs((prev) => {
          const newSet = new Set(prev);
          newSet.delete(newHabit.habit_id);
          return newSet;
        });

        setHabits((prevHabits) => [...prevHabits, newHabit]);

        return { newHabit, success: true };
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error);
          return {
            newHabit,
            success: false,
            error: `${error.response?.data.error}`,
          };
        } else {
          console.error(error);
          return {
            newHabit,
            success: false,
            error: `An unexpected error occurred: ${error}`,
          };
        }
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
    createHabit,
    deleteHabit,
    modifyHabit,
    habitsError,
    areHabitsLoading,
    loadingHabitIDs,
  };
};

export default useHabits;
