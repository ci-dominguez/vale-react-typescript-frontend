import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from '../api/axios';
import { Habit } from '../utils/types';

const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitsError, setHabitsError] = useState<string | null>(null);
  const [areHabitsLoading, setAreHabitsLoading] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    fetchHabits();
  }, [getToken]);

  const fetchHabits = async () => {
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
  };

  return {
    habits,
    setHabits,
    habitsError,
    areHabitsLoading,
  };
};

export default useHabits;
