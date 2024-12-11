interface DatePickerProps {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: (month: number) => void;
  setCurrentYear: (year: number) => void;
}

const DatePicker = ({
  currentMonth,
  currentYear,
  setCurrentMonth,
  setCurrentYear,
}: DatePickerProps) => {
  const handleDateChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentMonth(currentMonth - 1);
      if (currentMonth === 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      }
    } else if (direction === 'next') {
      setCurrentMonth(currentMonth + 1);
      if (currentMonth === 11) {
        setCurrentYear(currentYear + 1);
        setCurrentMonth(0);
      }
    }
  };

  return (
    <div className='flex bg-pink-300'>
      <button
        className='bg-purple-300 p-2'
        onClick={() => handleDateChange('prev')}
      >
        Prev
      </button>
      <span className='flex items-center p-2'>
        {new Date(currentYear, currentMonth).toLocaleDateString('default', {
          month: 'long',
        })}
        , {currentYear}
      </span>
      <button
        className='bg-purple-300 p-2'
        onClick={() => handleDateChange('next')}
      >
        Next
      </button>
    </div>
  );
};

export default DatePicker;
