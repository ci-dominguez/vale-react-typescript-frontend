import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Link } from 'react-router';

const Nav = () => {
  return (
    <nav className='flex gap-4'>
      <Link to='/'>Home</Link>
      <Link to='/habit-tracker'>Tracker</Link>
      <SignedOut>
        <Link to='/sign-in'>Login</Link>
        <Link to='/sign-up'>Get Started</Link>
      </SignedOut>
      <SignedIn>
        <>Youre signed in!</>
      </SignedIn>
    </nav>
  );
};

export default Nav;
