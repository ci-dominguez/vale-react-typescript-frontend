import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { Link } from 'react-router';

const Nav = () => {
  return (
    <nav className='flex gap-4'>
      <Link to='/'>Home</Link>
      <Link to='/tracker'>Tracker</Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};

export default Nav;
