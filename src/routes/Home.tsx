import MainLayout from '../layouts/MainLayout';
import DemoImage from '../assets/images/habit_demo.jpg';
import { Eye, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router';

const spotlight = [
  {
    icon: <Eye className='size-7 stroke-charcoal' />,
    title: 'Visualize your progress',
    description:
      'Understand your monthly habits at a glance in a beautiful calendar-like view.',
  },
  {
    icon: <Trophy className='size-7 stroke-charcoal' />,
    title: 'Flexible goals',
    description:
      'Life happens, so we model our habits towards goals rather than streaks. Encouraging you to keep going.',
  },
];

const HomePage = () => {
  return (
    <>
      <title>Vale | Habit Tracker</title>
      <meta
        name='description'
        content='Welcome to Vale. Our app helps you build and maintain positive habits with ease. Track your habits monthly, set goals, and manage your progress seamlessly. Join us today and start building the habits that lead to success!'
      />
      <MainLayout>
        <div className='flex flex-col gap-14 my-14'>
          <div className='flex flex-col gap-4 items-center text-center'>
            <h1 className='text-5xl lg:text-7xl font-editorial-italic'>
              Tiny changes,
              <br />
              <span className='font-editorial'>remarkable results.</span>
            </h1>
            <p className='font-montreal text-base lg:text-xl'>
              Everyday it gets a little easier. The hard part is doing it
              everyday.
            </p>
            <img
              src={DemoImage}
              alt='Demo habit tracker look with a calendar view.'
              className='max-w-[90%] mx-auto'
            />
          </div>

          <div className='flex flex-col gap-4 items-center text-center bg-ivory rounded-md py-20 px-6'>
            <h2 className='text-4xl lg:text-5xl font-editorial'>
              Simple and beautiful habit tracker
            </h2>

            <p className='font-montreal text-base lg:text-xl'>
              Here's how it works
            </p>

            <div className='flex flex-col sm:flex-row gap-4 mt-14'>
              {spotlight.map((item) => {
                return (
                  <div
                    key={item.title}
                    className='flex flex-col gap-2 text-left bg-eggshell p-10 rounded-md sm:w-1/2 max-w-96'
                  >
                    <h3 className='font-editorial text-2xl flex flex-col items-center gap-2'>
                      {item.icon}
                      <span className='text-center'>{item.title}</span>
                    </h3>
                    <p className='font-montreal text-base lg:text-xl'>
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col gap-4 items-center text-center bg-eggshell rounded-md py-20 px-6'>
            <div className='flex flex-col gap-4 mb-14'>
              <h2 className='text-4xl lg:text-5xl font-editorial'>
                Start your journey today
              </h2>

              <p className='font-montreal text-base lg:text-xl w-1/2 mx-auto'>
                Vale is 100% free to use. For users looking for more, we also
                offer a one-time-payment tier that grants unlimited access to
                Vale.{' '}
                <Link
                  to='/pricing'
                  className='underline hover:text-seafoam transition-colors duration-200'
                >
                  Learn more
                </Link>
                .
              </p>
            </div>
            <Button variant='primary'>
              <Link to='/sign-up' className='w-full py-3 px-10'>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default HomePage;
