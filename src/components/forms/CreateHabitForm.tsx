import { useState } from 'react';

interface CreateHabitFormProps {
  onSubmit: (name: string, description: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

const CreateHabitForm = ({
  onSubmit,
  onClose,
  isVisible,
}: CreateHabitFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <form
      className={`${isVisible ? 'flex flex-col' : 'hidden'} gap-4 bg-blue-300`}
    >
      <div className='flex flex-col gap-2'>
        <label htmlFor='habit_name'>Habit Name</label>
        <input
          type='text'
          id='habit_name'
          name='habit_name'
          required
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='habit_description'>Description</label>
        <input
          type='text'
          id='habit_description'
          name='habit_description'
          required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type='submit'
        onClick={(e) => {
          onSubmit(name, description);
          setName('');
          setDescription('');
          onClose();
          e.preventDefault();
        }}
        className='border border-black bg-slate-400 px-6 py-4'
      >
        Create Habit
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
