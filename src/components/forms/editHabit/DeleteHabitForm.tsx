import { useAuth } from '@clerk/clerk-react';
import api from '../../../api/axios';
import Button from '../../ui/Button';
import { Habit } from '../../../utils/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteHabitData,
  DeleteHabitSchema,
} from '../../../utils/validations/habitSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormProps {
  onSuccess: () => void;
  onHabitDeleted: (deletedHabit: Habit) => void;
  habit: Habit;
}

const DeleteHabitForm = ({ onSuccess, onHabitDeleted, habit }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { getToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteHabitData>({
    resolver: zodResolver(DeleteHabitSchema),
    defaultValues: {
      habitID: habit.habit_id || '',
    },
  });

  const onFormSubmit = async (data: DeleteHabitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      if (!data) throw new Error('No data provided');

      const token = await getToken();

      const resp = await api.delete(`/habits?habit=${data.habitID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Deleted habit:', resp.data);

      onHabitDeleted(habit);

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
      {submitError && (
        <p className='text-red-500 text-sm mt-1'>{submitError}</p>
      )}
      {submitSuccess && (
        <p className='text-green-500 text-sm mt-1'>Habit deleted!</p>
      )}
      <Button variant='destructive' type='submit'>
        <span className='px-6 py-4 w-full text-center'>
          {isSubmitting ? 'Deleting habit...' : 'Delete habit'}
        </span>
      </Button>
    </form>
  );
};

export default DeleteHabitForm;
