import { useMemo, useState } from 'react';
import useHabits from '../../hooks/useHabits';
import useHabitRecords from '../../hooks/useHabitRecords';
import DatePicker from './DatePicker';
import CreateHabitForm from '../forms/CreateHabitForm';
import { getDaysInMonth } from '../../utils/dateUtils';
import { Habit } from '../../utils/types';
import { Check, Plus } from 'lucide-react';
import EditHabitModal, {
  EditHabitButton,
} from '../forms/editHabit/EditHabitModal';
import HabitRowSkeleton, { HabitRecordSkeleton } from './HabitRowSkeleton';
const HabitTracker = () => {
  const [isCreateHabitFormOpen, setIsCreateHabitFormOpen] = useState(false);
  const [isEditHabitModalOpen, setIsEditHabitModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>();

  const currentDate = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const daysArray = getDaysInMonth(selectedYear, selectedMonth);

  const { habits, loadingHabitIDs, areHabitsLoading, setHabits } = useHabits();
  const habitIDs = useMemo(
    () => habits.map((habit) => habit.habit_id),
    [habits]
  );

  const { habitRecords, areRecordsLoading, updateHabitRecord } =
    useHabitRecords(habitIDs, selectedMonth, selectedYear);

  // Precompute a map of completed records for better performance
  const completedRecordsMap = useMemo(() => {
    const map = new Map();
    habitRecords.forEach((rec) => {
      map.set(`${rec.habit_id}-${rec.date}`, rec.is_completed);
    });
    return map;
  }, [habitRecords]);

  const isRecordCompleted = (habitID: string, date: string) => {
    return completedRecordsMap.get(`${habitID}-${date}`) || false;
  };

  const handleNewHabitCreated = (newHabit: Habit) => {
    setIsCreateHabitFormOpen(false);
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  const handleHabitUpdated = (updatedHabit: Habit) => {
    setIsEditHabitModalOpen(false);
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.habit_id === updatedHabit.habit_id ? updatedHabit : habit
      )
    );
  };

  const handleHabitDeleted = (deletedHabit: Habit) => {
    setIsEditHabitModalOpen(false);
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.habit_id !== deletedHabit.habit_id)
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
        <table className='min-w-full table-fixed border-[1px] border-whisper'>
          <colgroup>
            <col className='w-20 sm:w-40 xl:w-52' />
            {daysArray.map((_, index) => (
              <col key={`col-${index}`} className='w-4' />
            ))}
            <col className='w-10' />
            <col className='w-8' />
          </colgroup>

          <thead>
            <tr>
              <th
                className='border-[1px] border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Habits
              </th>

              {daysArray.map((day) => (
                <th
                  key={`weekday-${day.dayNum}`}
                  className={`border-[1px] border-whisper text-center align-middle whitespace-nowrap p-1 font-montreal font-normal ${
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
                className='border-[1px] border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Goal
              </th>
              <th
                className='border-[1px] border-whisper text-center align-middle whitespace-nowrap text-2xl px-4 font-editorial font-normal'
                rowSpan={2}
              >
                Achieved
              </th>
            </tr>

            <tr>
              {daysArray.map((day) => (
                <th
                  key={`day-${day.dayNum}`}
                  className={`border-[1px] border-whisper text-center align-middle whitespace-nowrap py-5 font-montreal font-normal ${
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
            {areHabitsLoading && <HabitRowSkeleton days={daysArray} />}
            {habits.map((habit) =>
              loadingHabitIDs.has(habit.habit_id) ? (
                <HabitRowSkeleton days={daysArray} />
              ) : (
                <tr key={habit.habit_id} className='h-10'>
                  <td className='group border-[1px] min-h-10 border-whisper font-montreal hover:bg-whisper/30'>
                    <div className='flex flex-row group-hover:justify-center gap-2'>
                      <span className='flex group-hover:hidden px-4 mx-auto text-center'>
                        {habit.name}
                      </span>
                      <EditHabitButton
                        onClick={() => {
                          setIsEditHabitModalOpen(true);
                          setSelectedHabit(habit);
                        }}
                      />
                    </div>
                  </td>
                  {daysArray.map((day) => {
                    if (areRecordsLoading)
                      return <HabitRecordSkeleton day={day} />;
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
                        className={`border-[1px] min-w-10 min-h-10 aspect-square hover:cursor-pointer transition-colors duration-100 ${
                          isRecordCompleted(habit.habit_id, recordDate)
                            ? `bg-habit-${habit.color}`
                            : 'border-whisper bg-white hover:bg-ivory'
                        }`}
                        onClick={() => {
                          updateHabitRecord(habit.habit_id, recordDate);
                        }}
                      >
                        {isRecordCompleted(habit.habit_id, recordDate) ? (
                          <Check className='size-4 stroke-charcoal mx-auto' />
                        ) : null}
                      </td>
                    );
                  })}
                  <td className='border-[1px] border-whisper text-center'>
                    {habit.goal}
                  </td>
                  <td className='border-[1px] border-whisper text-center'>
                    {
                      habitRecords.filter(
                        (rec) =>
                          rec.habit_id === habit.habit_id && rec.is_completed
                      ).length
                    }
                  </td>
                </tr>
              )
            )}

            <tr>
              <td
                colSpan={daysArray.length + 3}
                className='border-x-2 border-white'
              >
                <button
                  className='flex items-center 2xl:justify-center gap-2 py-2 w-full text-center group hover:bg-ivory'
                  onClick={() => setIsCreateHabitFormOpen(true)}
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
          onClose={() => setIsCreateHabitFormOpen(false)}
          onHabitCreated={handleNewHabitCreated}
          isVisible={isCreateHabitFormOpen}
        />
        <EditHabitModal
          onClose={() => setIsEditHabitModalOpen(false)}
          isVisible={isEditHabitModalOpen}
          habit={selectedHabit!}
          onHabitUpdated={handleHabitUpdated}
          onHabitDeleted={handleHabitDeleted}
        />
      </div>
    </div>
  );
};

export default HabitTracker;
