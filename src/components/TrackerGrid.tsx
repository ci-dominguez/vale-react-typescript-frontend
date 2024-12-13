import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from '../api/axios';
import DatePicker from './DatePicker';
import CreateHabitForm from './forms/CreateHabitForm';
import { Habit, HabitRecord } from '../types';

const getDaysInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      dayNum: i + 1,
      dayOfTheWeek: weekdays[date.getDay()],
    };
  });
};

const TrackerGrid = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitRecords, setHabitRecords] = useState<HabitRecord[]>([]);

  const { getToken } = useAuth();

  const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);

  const currentDate = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const daysArray = getDaysInMonth(selectedYear, selectedMonth);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = await getToken();
        console.log('JWT Token:', token);

        const resp = await axios.get('/habits', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHabits(resp.data);
      } catch (error) {
        setError(`Failed to fetch habits: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [selectedMonth, selectedYear, getToken]);

  const addNewHabit = (name: string, description: string) => {
    const newHabit: Habit = {
      habit_id: (habits.length + 1).toString(),
      user_id: 'user123',
      name,
      description,
      total_completions: 0,
      created_at: new Date(),
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabitRecord = (habitId: string, date: Date) => {
    const recordIndex = habitRecords.findIndex(
      (rec) =>
        rec.habit_id === habitId &&
        rec.date.toDateString() === date.toDateString()
    );

    if (recordIndex !== -1) {
      // Toggle existing record
      const updatedRecords = [...habitRecords];
      updatedRecords[recordIndex].is_completed =
        !updatedRecords[recordIndex].is_completed;

      setHabitRecords(updatedRecords);
    } else {
      // Create new record
      const newRecord: HabitRecord = {
        record_id: habitRecords.length + 1,
        habit_id: habitId,
        date,
        is_completed: true,
      };

      setHabitRecords([...habitRecords, newRecord]);
    }
  };

  const getButtonText = (habitId: string, date: Date) => {
    const record = habitRecords.find(
      (rec) =>
        rec.habit_id === habitId &&
        rec.date.toDateString() === date.toDateString()
    );

    return record?.is_completed ? 'x' : '-';
  };

  return (
    <div className='flex flex-col items-center'>
      <DatePicker
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <div className='overflow-x-none overflow-y-hidden w-full'>
        <table className=' min-w-full table-fixed border-collapse border'>
          <colgroup>
            <col className='w-20' />
            {daysArray.map((_, index) => (
              <col key={`col-${index}`} className='w-4' />
            ))}
            <col className='w-12' />
            <col className='w-8' />
          </colgroup>

          <thead>
            <tr>
              <th
                className='sticky border text-center align-middle whitespace-nowrap'
                rowSpan={2}
              >
                Habits
              </th>

              {daysArray.map((day) => (
                <th
                  key={`weekday-${day.dayNum}`}
                  className={`border text-center align-middle whitespace-nowrap ${
                    day.dayNum === currentDate.day &&
                    selectedMonth === currentDate.month - 1 &&
                    selectedYear === currentDate.year &&
                    'bg-violet-300'
                  }`}
                >
                  {day.dayOfTheWeek}
                </th>
              ))}
              <th
                className='border text-center align-middle whitespace-nowrap'
                rowSpan={2}
              >
                Goal
              </th>
              <th
                className='border text-center align-middle whitespace-nowrap'
                rowSpan={2}
              >
                Achieved
              </th>
            </tr>

            <tr>
              {daysArray.map((day) => (
                <th
                  key={`day-${day.dayNum}`}
                  className={`border text-center align-middle whitespace-nowrap py-5 ${
                    day.dayNum === currentDate.day &&
                    selectedMonth === currentDate.month - 1 &&
                    selectedYear === currentDate.year &&
                    'bg-violet-300'
                  }`}
                >
                  {day.dayNum}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.habit_id}>
                <td className='border'>{habit.name}</td>
                {daysArray.map((day) => {
                  const recordDate = new Date(
                    selectedYear,
                    selectedMonth,
                    day.dayNum
                  );

                  return (
                    <td
                      key={`record-${habit.habit_id}-${day.dayNum}`}
                      className='border'
                    >
                      <button
                        onClick={() =>
                          toggleHabitRecord(habit.habit_id, recordDate)
                        }
                      >
                        {getButtonText(habit.habit_id, recordDate)}
                      </button>
                    </td>
                  );
                })}
                <td className='border text-center'>goal: 0</td>
                <td className='border text-center'>achieved: 0</td>
              </tr>
            ))}
            <tr>
              <td colSpan={daysArray.length + 3} className='border'>
                <button
                  className='bg-slate-100 py-4 w-full text-center font-semibold'
                  onClick={() => setIsHabitFormOpen(true)}
                >
                  Click here to get started and create a new habit!
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <CreateHabitForm
          onSubmit={addNewHabit}
          onClose={() => setIsHabitFormOpen(false)}
          isVisible={isHabitFormOpen}
        />
      </div>
      {isLoading && (
        <div className='bg-green-400'>
          {' '}
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div className='bg-red-400'>
          {' '}
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TrackerGrid;
