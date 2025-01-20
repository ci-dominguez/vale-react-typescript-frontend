import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Logo from '../ui/Icons';
import { MenuIcon, X } from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname;

  return (
    <nav className='flex flex-col p-4 bg-white text-charcoal min-h-[84px]'>
      <div className='flex items-center justify-between min-h-[52px]'>
        <div className='flex items-center gap-4'>
          <Link to='/' className='flex gap-2 items-center'>
            <Logo className='fill-seafoam size-9' />
            <span className='font-editorial text-3xl pt-2'>Vale</span>
          </Link>

          <Link
            to='/habit-tracker'
            className={`hidden md:flex text-xl font-editorial pt-2 hover:underline ${
              route === '/habit-tracker' && 'underline'
            }`}
          >
            Habit Tracker
          </Link>
        </div>
        {/* Tablet & desktop nav menu */}
        <div className='hidden md:flex items-center gap-5'>
          <SignedOut>
            <Link
              to='/sign-in'
              className={`text-2xl font-editorial hover:underline ${
                route === '/sign-in' && 'underline'
              }`}
            >
              Sign In
            </Link>
            <Button variant='primary'>
              <Link to='/sign-up' className='w-full py-3 px-10'>
                Get Started
              </Link>
            </Button>
            <ThemeToggle />
          </SignedOut>
          <SignedIn>
            <Button variant='primary'>
              <Link to='/upgrade' className='w-full py-3 px-10'>
                Join Max
              </Link>
            </Button>
            <ThemeToggle />
            <Link to='/account'>
              <div className='bg-seafoam size-[46px] rounded-full hover:bg-seafoam/80' />
            </Link>
          </SignedIn>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className='md:hidden'
        >
          {isOpen ? (
            <X className='stroke-charcoal size-8' />
          ) : (
            <MenuIcon className='stroke-charcoal size-8' />
          )}
        </button>
      </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className='flex flex-col md:hidden border-[1px] rounded-lg border-whisper bg-ivory text-center p-10 mt-8 gap-4'>
          <SignedOut>
            <Link
              to='/sign-in'
              className={`text-2xl font-editorial ${
                route === '/sign-in' && 'underline'
              }`}
            >
              Sign In
            </Link>
            <Button variant='primary'>
              <Link
                to='/sign-up'
                className={`w-full py-3 ${route === '/sign-up' && 'underline'}`}
              >
                Get Started
              </Link>
            </Button>
            <div className='flex mx-auto'>
              <ThemeToggle />
            </div>
          </SignedOut>
          <SignedIn>
            <Link
              to='/habit-tracker'
              className={`text-2xl font-editorial ${
                route === '/habit-tracker' && 'underline'
              }`}
            >
              Habit Tracker
            </Link>
            <Button variant='primary'>
              <Link to='/upgrade' className='w-full py-3'>
                Join Max
              </Link>
            </Button>
            <div className='flex gap-4 mx-auto'>
              <ThemeToggle />
              <Link to='/account'>
                <div className='bg-seafoam size-[46px] rounded-full' />
              </Link>
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Nav;
