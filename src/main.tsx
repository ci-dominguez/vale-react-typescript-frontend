import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './routes/Home';
import Tracker from './routes/Tracker';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/tracker' element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
