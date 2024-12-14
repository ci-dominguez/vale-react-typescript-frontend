import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../api/axios';
import { Habit } from '../../utils/types';
import {
  createHabitSchema,
  CreateHabitData,
} from '../../utils/validations/createHabitSchema';

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
  } = useForm<CreateHabitData>({ resolver: zodResolver(createHabitSchema) });

  const onFormSubmit = async (data: CreateHabitData) => {
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

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`${isVisible ? 'flex flex-col' : 'hidden'} gap-4 bg-blue-300`}
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
        {isSubmitting ? 'Creating habit...' : 'Create Habit'}
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

export default CreateHabitForm;
