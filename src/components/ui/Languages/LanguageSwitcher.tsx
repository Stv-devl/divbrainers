'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

const LanguageSwitcher = ({ isOpen, onClose }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute bottom-[-55px] right-0 sm:top-12 sm:right-10 z-50 w-28 h-[72px] rounded-sm border border-gray-300 bg-white shadow-sm animate-[fade-in_0.3s_ease-out_forwards]"
    >
      <button
        onClick={() => changeLanguage('fr')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-100 transition-colors duration-300 rounded-t-sm cursor-pointer"
      >
        🇫🇷 Français
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-blue-100 transition-colors duration-300 rounded-b-sm cursor-pointer"
      >
        🇬🇧 English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
