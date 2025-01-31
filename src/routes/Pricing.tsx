import { Link } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '@clerk/clerk-react';
import { Check } from 'lucide-react';
import Button from '../components/ui/Button';

const tiers = [
  {
    title: 'Free',
    tag: 'Perfect for getting started',
    price: 0,
    tag1: 'Free forever',
    features: ['3 habits', 'Cross platform sync'],
    cta: 'Join Vale',
  },
  {
    title: 'Max',
    tag: 'Unlock your full potential',
    price: 5,
    tag1: 'Keep forever',
    features: [
      'Unlimited habits',
      'Cross platform sync',
      'Priority support',
      'Early access to new features',
    ],
    cta: 'Get Started',
  },
];

const PricingPage = () => {
  const { isSignedIn, userId } = useAuth();

  return (
    <MainLayout>
      <div className='flex flex-col gap-14 my-14'>
        <div className='flex flex-col gap-4 items-center text-center'>
          <h1 className='text-5xl lg:text-7xl font-editorial'>
            Choose your path to better habits
          </h1>
          <p className='font-montreal text-base lg:text-xl'>
            Transform your daily routines with the right plan for your needs.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row lg:justify-center gap-14 '>
          {tiers.map((tier) => {
            return (
              <div
                className={`flex flex-col rounded-md p-10 gap-4 lg:min-w-96 ${
                  tier.price === 0 ? 'bg-eggshell' : 'bg-[#191919] text-white'
                }`}
                key={tier.title}
              >
                <div>
                  <h3
                    className={`text-xl lg:text-2xl font-editorial ${
                      tier.price === 5 && 'text-seafoam'
                    }`}
                  >
                    {tier.title}
                  </h3>
                  <span className='font-montreal text-off'>{tier.tag}</span>
                </div>

                <div>
                  <h2 className='text-3xl lg:text-4xl font-montreal'>
                    ${tier.price}
                  </h2>
                  <span className='font-montreal text-off'>{tier.tag1}</span>
                </div>

                <ul className='lg:mb-auto'>
                  {tier.features.map((item) => {
                    return (
                      <li className='flex items-center gap-2' key={item}>
                        <Check
                          className={`size-4 ${
                            tier.price === 0
                              ? 'stroke-charcoal'
                              : 'stroke-seafoam'
                          }`}
                        />{' '}
                        {item}
                      </li>
                    );
                  })}
                </ul>

                <Button variant={tier.price === 0 ? 'secondary' : 'alt'}>
                  <Link
                    to={
                      isSignedIn
                        ? `https://buy.stripe.com/7sI9E0f4FaZ3g0geUU?client_reference_id=${userId}`
                        : '/sign-up'
                    }
                    className='w-full py-3 px-10'
                  >
                    {isSignedIn ? tier.cta : 'Join Vale'}
                  </Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default PricingPage;
