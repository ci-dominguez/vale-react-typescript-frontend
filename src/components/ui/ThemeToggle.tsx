import { useState, useEffect } from 'react';
import { Moon, Sun } from './Icons';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className='bg-parchment hover:bg-parchment/90 rounded-full p-3'
    >
      {isDarkMode ? (
        <Sun className='fill-charcoal stroke-charcoal' />
      ) : (
        <Moon className='fill-charcoal stroke-charcoal' />
      )}
    </button>
  );
};

export default ThemeToggle;
