import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../../api/axios';
import { Habit } from '../../../utils/types';
import {
  HabitFormSchema,
  HabitData,
} from '../../../utils/validations/habitSchema';
import Button from '../../ui/Button';

interface FormProps {
  onSuccess: () => void;
  onHabitUpdated: (updatedHabit: Habit) => void;
  habit: Habit;
}

const ModifyHabitForm = ({ onSuccess, onHabitUpdated, habit }: FormProps) => {
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
      onSuccess();
    } catch (error) {
      console.error(error);
      setSubmitError(`An error occurred while creating the habit: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col'>
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
      <div className='flex flex-col gap-2 mb-4'>
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
      <Button variant='primary' type='submit'>
        <span className='px-6 py-4 w-full text-center'>
          {isSubmitting ? 'Updating habit...' : 'Update habit'}
        </span>
      </Button>
    </form>
  );
};

export default ModifyHabitForm;
