import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import HomePage from './routes/Home';
import TrackerPage from './routes/Tracker';
import SignInPage from './routes/SignIn';
import SignUpPage from './routes/SignUp';
import PricingPage from './routes/Pricing';
import './index.css';
import ThanksPage from './routes/Thanks';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl='/'
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/habit-tracker' element={<TrackerPage />} />
          <Route path='/sign-in/*' element={<SignInPage />} />
          <Route path='/sign-up/*' element={<SignUpPage />} />
          <Route path='/pricing' element={<PricingPage />} />
          <Route path='/thanks' element={<ThanksPage />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
