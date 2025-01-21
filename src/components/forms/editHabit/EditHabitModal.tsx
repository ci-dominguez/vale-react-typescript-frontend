import { Pencil, X } from 'lucide-react';
import DeleteHabitForm from './DeleteHabitForm';
import { Habit } from '../../../utils/types';
import ModifyHabitForm from './ModifyHabitForm';

interface ModalProps {
  onClose: () => void;
  isVisible: boolean;
  habit: Habit;
  onHabitUpdated: (updatedHabit: Habit) => void;
  onHabitDeleted: (deletedHabit: Habit) => void;
}

interface ButtonProps {
  onClick: () => void;
}

export const EditHabitButton = ({ onClick }: ButtonProps) => {
  return (
    <button
      className='hidden group-hover:flex gap-1 items-center w-full px-4 justify-center group'
      onClick={onClick}
    >
      <span>Edit</span>
      <Pencil className='stroke-2 size-5 group-active:stroke-blue-600' />
    </button>
  );
};

const EditHabitModal = ({
  onClose,
  isVisible,
  habit,
  onHabitDeleted,
  onHabitUpdated,
}: ModalProps) => {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 flex bg-charcoal  bg-opacity-40 justify-center items-center'>
      <div className='flex flex-col overflow-y-auto max-h-screen w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] 2xl:w-[30%] px-4 sm:px-10 py-10 sm:py-14 gap-6 rounded-xl bg-eggshell'>
        <button type='button' onClick={onClose} className='mx-auto'>
          <X className='size-8 stroke-onyx bg-charcoal bg-opacity-0 hover:bg-opacity-20 rounded-full p-1' />
        </button>
        <span className='font-editorial text-3xl pt-2 text-center'>
          Modify Habit
        </span>
        <ModifyHabitForm
          onSuccess={onClose}
          onHabitUpdated={onHabitUpdated}
          habit={habit}
        />
        <span className='text-center'>&mdash;&mdash; or &mdash;&mdash;</span>
        <DeleteHabitForm
          onSuccess={onClose}
          onHabitDeleted={onHabitDeleted}
          habit={habit}
        />
      </div>
    </div>
  );
};

export default EditHabitModal;
