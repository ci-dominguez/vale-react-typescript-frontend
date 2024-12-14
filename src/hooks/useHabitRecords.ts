import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from '../api/axios';
import { Habit, HabitRecord } from '../utils/types';

const useHabitRecords = (
  habits: Habit[],
  selectedMonth: number,
  selectedYear: number
) => {
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [recordsError, setRecordsError] = useState<string | null>(null);
  const [areRecordsLoading, setAreRecordsLoading] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    if (habits.length > 0)
      fetchHabitRecords(habits, selectedMonth, selectedYear);
  }, [habits, selectedMonth, selectedYear, getToken]);

  const fetchHabitRecords = async (
    habits: Habit[],
    selectedMonth: number,
    selectedYear: number
  ) => {
    setAreRecordsLoading(true);
    setRecordsError(null);
    try {
      const token = await getToken();

      const habitIDs = habits.map((habit) => habit.habit_id).join(',');
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

      const resp = await axios.get(
        `/habit-records?habits=${habitIDs}&dates=${
          firstDay.toISOString().split('T')[0]
        },${lastDay.toISOString().split('T')[0]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHabitRecords(resp.data);
    } catch (error) {
      setRecordsError(`Failed to fetch habit records: ${error}`);
    } finally {
      setAreRecordsLoading(false);
    }
  };

  return {
    habitRecords,
    setHabitRecords,
    recordsError,
    areRecordsLoading,
    fetchHabitRecords,
  };
};

export default useHabitRecords;
