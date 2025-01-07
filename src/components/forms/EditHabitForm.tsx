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
import { Pencil, X } from 'lucide-react';
import Button from '../ui/Button';

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
    <button
      className='hidden group-hover:flex gap-1 items-center w-full px-4 justify-center group'
      onClick={onClick}
    >
      <span>Edit</span>
      <Pencil className='stroke-2 size-5 group-active:stroke-blue-600' />
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

  if (!isVisible) return null;

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className='fixed inset-0 z-50 flex bg-charcoal  bg-opacity-40 justify-center items-center'
    >
      <div className='flex flex-col overflow-y-auto max-h-screen w-[90%] px-4 py-10 gap-6 rounded-xl bg-eggshell'>
        <button type='button' onClick={onClose} className='mx-auto'>
          <X className='size-6 stroke-onyx' />
        </button>
        <span className='font-editorial text-3xl pt-2 text-center'>
          Edit Habit
        </span>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='font-montreal text-lg pt-2'>
            Habit Name
          </label>
          <input
            {...register('name')}
            type='text'
            id='name'
            className='bg-eggshell border-b-charcoal border-b-2 border-opacity-40 focus:border-opacity-100 outline-none'
          />
          {errors.name && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='description' className='font-montreal text-lg pt-2'>
            Description
          </label>
          <textarea
            {...register('description')}
            id='description'
            className='bg-eggshell border-b-charcoal border-b-2 border-opacity-40 focus:border-opacity-100 outline-none'
          />
          {errors.description && (
            <span className='text-red-500 text-sm mt-1'>
              {errors.description.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='goal' className='font-montreal text-lg pt-2'>
            Monthly Goal
          </label>
          <input
            {...register('goal')}
            type='number'
            id='goal'
            className='bg-eggshell border-b-charcoal border-b-2 border-opacity-40 focus:border-opacity-100 outline-none'
          />
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
        <div className='flex flex-col gap-4'>
          <Button variant='primary' type='submit'>
            <span className='px-6 py-4 w-full text-center'>
              {isSubmitting ? 'Updating habit...' : 'Update habit'}
            </span>
          </Button>
          <span className='text-center'>&mdash;&mdash; or &mdash;&mdash;</span>
          <Button variant='error' type='button' onClick={onClose}>
            <span className='px-6 py-4 w-full text-center'>
              {isSubmitting ? 'Deleting habit...' : 'Delete habit'}
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditHabitForm;
