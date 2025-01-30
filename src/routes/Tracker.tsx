import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import HabitTracker from '../components/habitTracker/HabitTracker';
import MainLayout from '../layouts/MainLayout';

const TrackerPage = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <RedirectToSignIn redirectUrl='/sign-in' />;
  return (
    <MainLayout>
      <HabitTracker />
    </MainLayout>
  );
};

export default TrackerPage;
