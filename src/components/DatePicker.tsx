interface DatePickerProps {
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}

const DatePicker = ({
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}: DatePickerProps) => {
  const handleDateChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedMonth(selectedMonth - 1);
      if (selectedMonth === 0) {
        setSelectedYear(selectedYear - 1);
        setSelectedMonth(11);
      }
    } else if (direction === 'next') {
      setSelectedMonth(selectedMonth + 1);
      if (selectedMonth === 11) {
        setSelectedYear(selectedYear + 1);
        setSelectedMonth(0);
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
        {new Date(selectedYear, selectedMonth).toLocaleDateString('default', {
          month: 'long',
        })}
        , {selectedYear}
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
