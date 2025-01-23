import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Habit } from '../../utils/types';
import {
  CreateHabitSchema,
  CreateHabitData,
} from '../../utils/validations/habitSchema';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import axios from 'axios';
import useHabits from '../../hooks/useHabits';

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

  const { createHabit } = useHabits();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateHabitData>({ resolver: zodResolver(CreateHabitSchema) });

  const onFormSubmit = async (data: CreateHabitData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      if (!data) throw new Error('No data provided');

      const result = await createHabit(data);

      if (result.success) {
        onHabitCreated(result.newHabit);
        setSubmitSuccess(true);
        reset();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setSubmitError(`${error.response?.data.error}`);
      } else {
        console.error(error);
        setSubmitError(`An unexpected error occurred: ${error}`);
      }
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
      <div className='flex flex-col overflow-y-auto max-h-screen w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] 2xl:w-[30%] px-4 sm:px-10 py-10 sm:py-14 gap-6 sm:gap-10 rounded-xl bg-eggshell'>
        <button
          type='button'
          onClick={() => {
            onClose();
            setSubmitSuccess(false);
            setSubmitError(null);
          }}
          className='mx-auto'
        >
          <X className='size-8 stroke-onyx bg-charcoal bg-opacity-0 hover:bg-opacity-20 rounded-full p-1' />
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
