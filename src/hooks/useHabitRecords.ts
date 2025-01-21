import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from '../api/axios';
import { HabitRecord } from '../utils/types';

const useHabitRecords = (
  habitIDs: string[],
  selectedMonth: number,
  selectedYear: number
) => {
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);
  const [recordsError, setRecordsError] = useState<string | null>(null);
  const [areRecordsLoading, setAreRecordsLoading] = useState(false);

  const { getToken } = useAuth();

  const updateHabitRecord = useCallback(
    async (habitID: string, date: string) => {
      // Immediately update the record locally
      setHabitRecords((prevRecords) => {
        const updatedRecords = prevRecords.map((record) =>
          record.habit_id === habitID && record.date === date
            ? { ...record, is_completed: !record.is_completed }
            : record
        );

        // Check if record exists, if not add it as a new record
        const recordExists = updatedRecords.some(
          (record) => record.habit_id === habitID && record.date === date
        );

        if (!recordExists) {
          updatedRecords.push({
            habit_id: habitID,
            record_id: Math.random(),
            date,
            is_completed: true,
          });
        }

        return updatedRecords;
      });

      try {
        const token = await getToken();

        const resp = await axios.patch(
          `/habit-records?habit=${habitID}&date=${date}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update record in database
        setHabitRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.habit_id === habitID && record.date === date
              ? { ...record, is_completed: resp.data.is_completed }
              : record
          )
        );
      } catch (error) {
        console.error('Failed to update habit record:', error);
        setRecordsError(`Failed to update habit record: ${error}`);

        // Revert local changes if database update fails
        setHabitRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.habit_id === habitID && record.date === date
              ? { ...record, is_completed: !record.is_completed }
              : record
          )
        );
      }
    },
    [getToken]
  );

  const fetchHabitRecords = useCallback(
    async (habitIDs: string[], selectedMonth: number, selectedYear: number) => {
      setAreRecordsLoading(true);
      setRecordsError(null);
      try {
        const token = await getToken();

        const idsQuery = habitIDs.join(',');
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

        const resp = await axios.get(
          `/habit-records?habits=${idsQuery}&dates=${
            firstDay.toISOString().split('T')[0]
          },${lastDay.toISOString().split('T')[0]}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const clientRecordsArr: HabitRecord[] = resp.data.map(
          (record: HabitRecord) => {
            return {
              habit_id: record.habit_id,
              record_id: record.record_id,
              date: new Date(record.date).toISOString().split('T')[0],
              is_completed: record.is_completed,
            };
          }
        );

        setHabitRecords(clientRecordsArr);
      } catch (error) {
        setRecordsError(`Failed to fetch habit records: ${error}`);
      } finally {
        setAreRecordsLoading(false);
      }
    },
    [getToken]
  );

  useEffect(() => {
    if (habitIDs.length > 0)
      fetchHabitRecords(habitIDs, selectedMonth, selectedYear);
  }, [fetchHabitRecords, habitIDs, selectedMonth, selectedYear]);

  return {
    habitRecords,
    setHabitRecords,
    recordsError,
    areRecordsLoading,
    fetchHabitRecords,
    updateHabitRecord,
  };
};

export default useHabitRecords;
