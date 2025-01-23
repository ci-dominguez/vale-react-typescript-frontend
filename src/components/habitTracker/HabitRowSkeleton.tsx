import { LoaderCircle } from 'lucide-react';

interface RowSkeletonProps {
  days: {
    dayNum: number;
    dayOfTheWeek: string;
  }[];
}

interface RecordSkeletonProps {
  day: {
    dayNum: number;
    dayOfTheWeek: string;
  };
}

export const HabitRecordSkeleton = ({ day }: RecordSkeletonProps) => {
  return (
    <td
      key={`record-skeleton-${day.dayNum}`}
      className='border-[1px] min-w-10 min-h-10 aspect-square'
    >
      <LoaderCircle className='size-4 stroke-charcoal mx-auto animate-spin' />
    </td>
  );
};

const HabitRowSkeleton = ({ days }: RowSkeletonProps) => {
  return (
    <tr className='h-10'>
      <td className='border-[1px] border-whisper'>
        <div className='flex flex-row w-full'>
          <span className='flex mx-4 bg-charcoal bg-opacity-75 animate-pulse h-[24px] w-full rounded-sm' />
        </div>
      </td>
      {days.map((day) => {
        return <HabitRecordSkeleton day={day} key={Math.random()} />;
      })}
      <td className='border-[1px] border-whisper text-center'>
        <div className='flex flex-row w-full'>
          <span className='flex animate-pulse mx-4 bg-charcoal bg-opacity-75 h-[24px] w-full rounded-sm' />
        </div>
      </td>
      <td className='border-[1px] border-whisper text-center'>
        <div className='flex flex-row w-full'>
          <span className='flex animate-pulse mx-4 bg-charcoal bg-opacity-75 h-[24px] w-full rounded-sm' />
        </div>
      </td>
    </tr>
  );
};

export default HabitRowSkeleton;
