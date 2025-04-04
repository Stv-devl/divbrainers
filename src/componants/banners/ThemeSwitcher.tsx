import React, { useEffect, useState } from 'react';
import { iconsMap } from '../../constante/iconsMap';

/**
 * ThemeSwitcher component
 * A toggle button that switches between light and dark mode.
 * Uses ThemeContext to access and update the current theme.
 * @returns {JSX.Element} The rendered theme switcher button
 */
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const Icon = theme === 'dark' ? iconsMap.IconLight : iconsMap.IconDark;

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1 sm:gap-2 cursor-pointer focus:outline-none"
    >
      <Icon className="size-5 sm:size-6 hover:scale-105 transition-transform" />
    </button>
  );
};

export default ThemeSwitcher;
