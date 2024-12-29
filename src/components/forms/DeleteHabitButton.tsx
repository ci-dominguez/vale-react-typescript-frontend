import { useAuth } from '@clerk/clerk-react';
import api from '../../api/axios';
import { Trash } from 'lucide-react';

interface DeleteHabitButtonProps {
  habitID: string;
}

const DeleteHabitButton = ({ habitID }: DeleteHabitButtonProps) => {
  const { getToken } = useAuth();

  const handleHabitDeletion = async () => {
    const token = await getToken();

    const resp = await api.delete(`/habits?habit=${habitID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Deleted habit:', resp.data);
  };
  return (
    <button className='hidden group-hover:flex' onClick={handleHabitDeletion}>
      <Trash className='stroke-2 stroke-red-600' />
    </button>
  );
};

export default DeleteHabitButton;
