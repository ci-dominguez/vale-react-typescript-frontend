import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Habit } from '../../../utils/types';
import {
  ModifyHabitData,
  ModifyHabitSchema,
} from '../../../utils/validations/habitSchema';
import Button from '../../ui/Button';
import useHabits from '../../../hooks/useHabits';

interface FormProps {
  onSuccess: () => void;
  onHabitUpdated: (updatedHabit: Habit) => void;
  habit: Habit;
}

const ModifyHabitForm = ({ onSuccess, onHabitUpdated, habit }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { modifyHabit } = useHabits();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ModifyHabitData>({
    resolver: zodResolver(ModifyHabitSchema),
    defaultValues: {
      habitID: habit.habit_id || '',
      name: '',
      description: '',
      goal: undefined,
    },
  });

  useEffect(() => {
    if (habit) {
      reset({
        habitID: habit.habit_id || '',
        name: habit.name || '',
        description: habit.description || '',
        goal: habit.goal || undefined,
      });
    }
  }, [habit, reset]);

  const onFormSubmit = async (data: ModifyHabitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      if (!habit) throw new Error('Habit not found');

      const result = await modifyHabit(data);

      if (result.success) {
        onHabitUpdated(result.updatedHabit);
        setSubmitSuccess(true);
        reset();
        onSuccess();
      }
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
      className='flex flex-col gap-6 sm:gap-10'
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='habitID' className='hidden'>
          Monthly Goal
        </label>
        <input
          {...register('habitID')}
          type='text'
          id='habitID'
          className='hidden'
          defaultValue={habit.habit_id}
        />
        {errors.habitID && (
          <span className='text-red-500 text-sm mt-1'>
            {errors.habitID.message}
          </span>
        )}
      </div>
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
