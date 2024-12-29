import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { Habit } from '../../utils/types';
import {
  HabitFormSchema,
  HabitData,
} from '../../utils/validations/habitSchema';
import { Pencil } from 'lucide-react';

interface FormProps {
  onClose: () => void;
  onHabitUpdated: (updatedHabit: Habit) => void;
  isVisible: boolean;
  habit: Habit | null;
}

interface ButtonProps {
  onClick: () => void;
}

export const EditHabitFormButton = ({ onClick }: ButtonProps) => {
  return (
    <button className='hidden group-hover:flex' onClick={onClick}>
      <Pencil className='stroke-2' />
    </button>
  );
};

const EditHabitForm = ({
  onClose,
  onHabitUpdated,
  isVisible,
  habit,
}: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { getToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HabitData>({
    resolver: zodResolver(HabitFormSchema),
    defaultValues: {
      name: '',
      description: '',
      goal: undefined,
    },
  });

  useEffect(() => {
    if (habit) {
      reset({
        name: habit.name || '',
        description: habit.description || '',
        goal: habit.goal || undefined,
      });
    }
  }, [habit, reset]);

  const onFormSubmit = async (data: HabitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      if (!habit) throw new Error('Habit not found');

      const token = await getToken();

      const resp = await api.patch(
        `/habits?habit=${habit.habit_id}`,
        {
          name: data.name,
          description: data.description,
          goal: data.goal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp.data);

      const updatedHabit: Habit = resp.data;
      onHabitUpdated(updatedHabit);

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
      setSubmitError(`An error occurred while creating the habit: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`${
        isVisible ? 'flex flex-col' : 'hidden'
      } gap-4 bg-purple-500`}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='name'>Habit Name</label>
        <input {...register('name')} type='text' id='name' />
        {errors.name && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.name.message}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='description'>Description</label>
        <input {...register('description')} type='text' id='description' />
        {errors.description && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.description.message}
          </span>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='goal'>Monthly Goal</label>
        <input {...register('goal')} type='number' id='goal' />
        {errors.description && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.description.message}
          </span>
        )}
      </div>
      {submitError && (
        <p className='text-red-500 text-sm mt-1'>{submitError}</p>
      )}
      {submitSuccess && (
        <p className='text-green-500 text-sm mt-1'>Habit created!</p>
      )}
      <button
        type='submit'
        className='border border-black bg-slate-400 px-6 py-4'
      >
        {isSubmitting ? 'Updating habit...' : 'Update Habit'}
      </button>
      <button
        type='button'
        onClick={onClose}
        className='border border-black bg-red-500 px-6 py-4'
      >
        Close Form
      </button>
    </form>
  );
};

export default EditHabitForm;
