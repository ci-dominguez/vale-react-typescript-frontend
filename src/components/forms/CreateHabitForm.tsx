import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { Habit } from '../../utils/types';
import {
  HabitFormSchema,
  HabitData,
} from '../../utils/validations/habitSchema';
import { X } from 'lucide-react';
import Button from '../ui/Button';

interface CreateHabitFormProps {
  onClose: () => void;
  onHabitCreated: (newHabit: Habit) => void;
  isVisible: boolean;
}

const CreateHabitForm = ({
  onClose,
  onHabitCreated,
  isVisible,
}: CreateHabitFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { getToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HabitData>({ resolver: zodResolver(HabitFormSchema) });

  const onFormSubmit = async (data: HabitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const token = await getToken();

      const resp = await api.post('/habits', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);

      const newHabit: Habit = resp.data;
      onHabitCreated(newHabit);

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
          New Habit
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
          <input
            {...register('description')}
            type='text'
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
        <Button variant='primary' type='submit'>
          <span className='px-6 py-4 w-full text-center'>
            {isSubmitting ? 'Creating habit...' : 'Create habit'}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default CreateHabitForm;
