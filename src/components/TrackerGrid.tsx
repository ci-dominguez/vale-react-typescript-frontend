import { useState } from 'react';
import DatePicker from './DatePicker';
import CreateHabitForm from './forms/CreateHabitForm';
import { Habit } from '../utils/types';
import useHabits from '../hooks/useHabits';
import useHabitRecords from '../hooks/useHabitRecords';

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
  const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);

  const currentDate = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const daysArray = getDaysInMonth(selectedYear, selectedMonth);

  const { habits, setHabits, habitsError, areHabitsLoading } = useHabits();
  const { habitRecords, recordsError, areRecordsLoading, updateHabitRecord } =
    useHabitRecords(habits, selectedMonth, selectedYear);

  const handleNewHabitCreated = (newHabit: Habit) => {
    setIsHabitFormOpen(false);
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const getButtonText = (habitId: string, date: string) => {
    const record = habitRecords.find(
      (rec) => rec.habit_id === habitId && rec.date === date
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
        <table className='min-w-full table-fixed border-collapse border'>
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
                  )
                    .toISOString()
                    .split('T')[0];

                  return (
                    <td
                      key={`record-${habit.habit_id}-${day.dayNum}`}
                      className='border'
                    >
                      <button
                        onClick={() => {
                          // console.log('record date:', recordDate);
                          updateHabitRecord(habit.habit_id, recordDate);
                        }}
                        className={`size-full ${
                          areRecordsLoading
                            ? 'bg-blue-500'
                            : recordsError
                            ? 'bg-red-500'
                            : 'bg-green-500'
                        }`}
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
          onClose={() => setIsHabitFormOpen(false)}
          onHabitCreated={handleNewHabitCreated}
          isVisible={isHabitFormOpen}
        />
      </div>
      {areHabitsLoading && (
        <div className='bg-green-400'>
          {' '}
          <p>Loading...</p>
        </div>
      )}
      {habitsError && (
        <div className='bg-red-400'>
          {' '}
          <p>1. {habitsError}</p>
          <p>2. {recordsError}</p>
        </div>
      )}
    </div>
  );
};

export default TrackerGrid;
