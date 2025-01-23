import { Link } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '@clerk/clerk-react';

const PricingPage = () => {
  const { isSignedIn, userId } = useAuth();

  return (
    <MainLayout>
      <div className='flex flex-col gap-5 justify-center items-center mt-20'>
        <Link
          to={
            isSignedIn
              ? `https://buy.stripe.com/test_cN2cQReTCgU6cN2000?client_reference_id=${userId}`
              : 'sign-up'
          }
          className='bg-charcoal text-eggshell rounded-full py-3 px-6'
        >
          {isSignedIn ? 'Upgrade to Max' : 'Join Vale'}
        </Link>
      </div>
    </MainLayout>
  );
};

export default PricingPage;
