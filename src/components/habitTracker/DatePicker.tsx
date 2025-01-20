import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className='flex items-center gap-4 py-14'>
      <button
        className='p-2 bg-eggshell hover:bg-parchment rounded-full'
        onClick={() => handleDateChange('prev')}
      >
        <ChevronLeft className='size-4 stroke-charcoal' />
      </button>
      <h1 className='flex items-center font-editorial text-2xl md:text-3xl pt-2'>
        {new Date(selectedYear, selectedMonth).toLocaleDateString('default', {
          month: 'long',
        })}
        , {selectedYear}
      </h1>
      <button
        className='p-2 bg-eggshell hover:bg-parchment rounded-full'
        onClick={() => handleDateChange('next')}
      >
        <ChevronRight className='size-4 stroke-charcoal' />
      </button>
    </div>
  );
};

export default DatePicker;
