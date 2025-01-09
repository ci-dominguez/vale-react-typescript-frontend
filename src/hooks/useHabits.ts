import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from '../api/axios';
import { Habit } from '../utils/types';

const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsError, setHabitsError] = useState<string | null>(null);
  const [areHabitsLoading, setAreHabitsLoading] = useState(false);

  const { getToken } = useAuth();

  const fetchHabits = useCallback(async () => {
    setAreHabitsLoading(true);
    setHabitsError(null);
    try {
      const token = await getToken();

      const resp = await axios.get('/habits', {
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
    habitsError,
    areHabitsLoading,
  };
};

export default useHabits;
