interface SkeletonProps {
  daysArray: {
    dayNum: number;
    dayOfTheWeek: string;
  }[];
}

const HabitRowSkeleton = ({ daysArray }: SkeletonProps) => {
  return (
    <tr className='h-10'>
      <td className='border-2 border-whisper'>
        <div className='flex flex-row w-full'>
          <span className='flex mx-4 bg-charcoal bg-opacity-75 h-[24px] w-full rounded-sm' />
        </div>
      </td>
      {daysArray.map((day) => {
        return (
          <td
            key={`record-skeleton-${day.dayNum}`}
            className='group p-0 border-2'
          >
            <div className='flex flex-row w-full justify-center'>
              <span className='flex animate-pulse bg-charcoal bg-opacity-25 size-4 rounded-sm' />
            </div>
          </td>
        );
      })}
      <td className='border-2 border-whisper text-center'>
        <div className='flex flex-row w-full'>
          <span className='flex animate-pulse mx-4 bg-charcoal bg-opacity-75 h-[24px] w-full rounded-sm' />
        </div>
      </td>
      <td className='border-2 border-whisper text-center'>
        <div className='flex flex-row w-full'>
          <span className='flex animate-pulse mx-4 bg-charcoal bg-opacity-75 h-[24px] w-full rounded-sm' />
        </div>
      </td>
    </tr>
  );
};

export default HabitRowSkeleton;
