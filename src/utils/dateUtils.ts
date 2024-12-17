export const getDaysInMonth = (year: number, month: number) => {
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
