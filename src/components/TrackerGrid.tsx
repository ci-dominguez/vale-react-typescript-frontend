import { useState } from 'react';
import useHabits from '../hooks/useHabits';
import useHabitRecords from '../hooks/useHabitRecords';
import DatePicker from './DatePicker';
import CreateHabitForm from './forms/CreateHabitForm';
import { getDaysInMonth } from '../utils/dateUtils';
import { Habit } from '../utils/types';
import { Check, Plus } from 'lucide-react';

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

  const { habits, setHabits } = useHabits();
  const { habitRecords, updateHabitRecord } = useHabitRecords(
    habits,
    selectedMonth,
    selectedYear
  );

  const handleNewHabitCreated = (newHabit: Habit) => {
    setIsHabitFormOpen(false);
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const getButtonContent = (habitId: string, date: string) => {
    const record = habitRecords.find(
      (rec) => rec.habit_id === habitId && rec.date === date
    );

    return record?.is_completed ? (
      <Check className='size-5 stroke-charcoal' />
    ) : (
      <></>
    );
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
        <table className='min-w-full table-fixed border-2 border-whisper'>
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
                className='border-2 border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Habits
              </th>

              {daysArray.map((day) => (
                <th
                  key={`weekday-${day.dayNum}`}
                  className={`border-2 border-whisper text-center align-middle whitespace-nowrap p-1 min-w-[35px] font-montreal font-normal ${
                    day.dayNum === currentDate.day &&
                    selectedMonth === currentDate.month - 1 &&
                    selectedYear === currentDate.year &&
                    'bg-charcoal text-white border-charcoal'
                  }`}
                >
                  {day.dayOfTheWeek}
                </th>
              ))}
              <th
                className='border-2 border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Goal
              </th>
              <th
                className='border-2 border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Achieved
              </th>
            </tr>

            <tr>
              {daysArray.map((day) => (
                <th
                  key={`day-${day.dayNum}`}
                  className={`border-2 border-whisper text-center align-middle whitespace-nowrap py-5 font-montreal font-normal ${
                    day.dayNum === currentDate.day &&
                    selectedMonth === currentDate.month - 1 &&
                    selectedYear === currentDate.year &&
                    'bg-charcoal text-white border-charcoal'
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
                <td className='border-2 border-whisper font-montreal px-4'>
                  {habit.name}
                </td>
                {daysArray.map((day) => {
                  const recordDate = new Date(
                    selectedYear,
                    selectedMonth,
                    day.dayNum
                  )
                    .toISOString()
                    .split('T')[0];

                  const isRecordCompleted = habitRecords.some(
                    (record) =>
                      record.habit_id === habit.habit_id &&
                      record.date === recordDate &&
                      record.is_completed
                  );

                  return (
                    <td
                      key={`record-${habit.habit_id}-${day.dayNum}`}
                      className={`p-0 border-2 ${
                        isRecordCompleted ? 'border-eggshell' : 'border-whisper'
                      }`}
                    >
                      <button
                        onClick={() => {
                          updateHabitRecord(habit.habit_id, recordDate);
                        }}
                        className={`size-[35px] xl:size-full xl:min-h-[35px] flex items-center justify-center ${
                          isRecordCompleted
                            ? 'bg-eggshell hover:bg-parchment'
                            : 'bg-white hover:bg-ivory'
                        }`}
                      >
                        {getButtonContent(habit.habit_id, recordDate)}
                      </button>
                    </td>
                  );
                })}
                <td className='border-2 border-whisper text-center'>
                  {habit.goal}
                </td>
                <td className='border-2 border-whisper text-center'>
                  {habit.achieved}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={daysArray.length + 3}
                className='border-x-2 border-white'
              >
                <button
                  className='flex items-center gap-2 py-2 w-full text-center group hover:bg-ivory'
                  onClick={() => setIsHabitFormOpen(true)}
                >
                  <Plus className='size-6 stroke-off group-hover:stroke-charcoal' />
                  <span className='text-off font-montreal text-lg group-hover:text-charcoal'>
                    New Habit
                  </span>
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
    </div>
  );
};

export default TrackerGrid;
