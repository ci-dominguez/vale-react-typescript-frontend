import { useAuth } from '@clerk/clerk-react';
import MainLayout from '../layouts/MainLayout';

const ThanksPage = () => {
  const { isSignedIn, userId } = useAuth();

  return (
    <MainLayout>
      Thank you!{' '}
      {isSignedIn && (
        <span>
          <b>User: </b>
          {userId}
        </span>
      )}
    </MainLayout>
  );
};

export default ThanksPage;
