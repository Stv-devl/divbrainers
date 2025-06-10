'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface LanguageSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * LanguageSwitcher component that allows users to switch between different languages
 * @param {LanguageSwitcherProps} props - The component props
 * @returns {JSX.Element | null} A dropdown menu for language selection or null if not open
 */
const LanguageSwitcher = ({ isOpen, onClose }: LanguageSwitcherProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Changes the current language by updating the URL path
   * @param {string} lang - The language code to switch to
   */
  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
    onClose();
  };

  useEffect(() => {
    /**
     * Handles clicks outside the language switcher to close it
     * @param {MouseEvent} event - The mouse event
     */
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
