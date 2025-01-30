import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { links } from '../../utils/links';
import Logo from '../ui/Icons';
import { MenuIcon, X } from 'lucide-react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const route = location.pathname;

  return (
    <nav className='flex flex-col p-4 md:p-6 lg:py-10 lg:px-10 xl:px-20 3xl:px-52 bg-white text-charcoal min-h-[84px]'>
      <div className='flex items-center justify-between min-h-[52px]'>
        <div className='flex items-center gap-10'>
          <Link to='/' className='flex gap-2 items-center'>
            <Logo className='fill-seafoam size-9' />
            <span className='font-editorial text-3xl pt-2'>Vale</span>
          </Link>

          <SignedIn>
            <Link
              to={links[0].links[1].to}
              className={`hidden lg:flex text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[0].links[1].to && 'text-seafoam'
              }`}
            >
              {links[0].links[1].text}
            </Link>

            <Link
              to={links[1].links[0].to}
              className={`hidden lg:flex text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[0].to && 'text-seafoam'
              }`}
            >
              {links[1].links[0].text}
            </Link>

            <Link
              to={links[1].links[1].to}
              className={`hidden lg:flex text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[1].to && 'text-seafoam'
              }`}
            >
              {links[1].links[1].text}
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              to={links[0].links[1].to}
              className={`hidden lg:flex text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[0].links[1].to && 'text-seafoam'
              }`}
            >
              {links[0].links[1].text}
            </Link>

            <Link
              to={links[1].links[0].to}
              className={`hidden lg:flex text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[0].to && 'text-seafoam'
              }`}
            >
              {links[1].links[0].text}
            </Link>
          </SignedOut>
        </div>

        <div className='hidden lg:flex items-center gap-5'>
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
              <Link to='/pricing' className='w-full py-3 px-10'>
                Join Max
              </Link>
            </Button>
            <ThemeToggle />
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-[46px] h-[46px]',
                },
              }}
            />
          </SignedIn>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className='lg:hidden'
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
        <div className='flex flex-col lg:hidden border-[1px] rounded-lg border-whisper bg-ivory text-center p-10 mt-8 gap-4'>
          <SignedOut>
            <Link
              to={links[1].links[0].to}
              className={`text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[0].to && 'text-seafoam'
              }`}
            >
              {links[1].links[0].text}
            </Link>
            <Link
              to='/sign-in'
              className={`text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === '/sign-in' && 'text-seafoam'
              }`}
            >
              Sign in
            </Link>
            <Button variant='primary'>
              <Link to='/sign-up' className='w-full py-3'>
                Get Started
              </Link>
            </Button>
            <div className='flex mx-auto'>
              <ThemeToggle />
            </div>
          </SignedOut>
          <SignedIn>
            <Link
              to={links[0].links[1].to}
              className={`text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[0].links[1].to && 'text-seafoam'
              }`}
            >
              {links[0].links[1].text}
            </Link>

            <Link
              to={links[1].links[0].to}
              className={`text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[0].to && 'text-seafoam'
              }`}
            >
              {links[1].links[0].text}
            </Link>

            <Link
              to={links[1].links[1].to}
              className={`text-xl font-montreal hover:text-seafoam transition-colors duration-200 ${
                route === links[1].links[1].to && 'text-seafoam'
              }`}
            >
              {links[1].links[1].text}
            </Link>
            <Button variant='primary'>
              <Link to='/pricing' className='w-full py-3'>
                Join Max
              </Link>
            </Button>
            <div className='flex gap-4 mx-auto'>
              <ThemeToggle />
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-[46px] h-[46px]',
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Nav;
