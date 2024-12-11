import { useState } from 'react';
import DatePicker from './DatePicker';

const getDaysInMonth = (year: number, month: number): number => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

const TrackerGrid = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const daysArray = Array.from(
    { length: getDaysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  return (
    <div className='flex flex-col items-center bg-orange-300'>
      <DatePicker
        currentMonth={currentMonth}
        currentYear={currentYear}
        setCurrentMonth={setCurrentMonth}
        setCurrentYear={setCurrentYear}
      />
      <div className='flex bg-yellow-300'>
        <div>Habits</div>
        <div className='flex flex-row gap-1 bg-lime-300'>
          {daysArray.map((day) => {
            return (
              <div
                key={day}
                className='border-[1px] border-gray-400 bg-gray-200 px-1'
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackerGrid;
