import { useEffect, useState } from 'react';
import { getTechLogos } from '../../../lib/utils/getTechLogo';

/**
 * Custom hook to fetch and manage technology icons based on a stack array
 * @param {string[]} stack - Array of technology names to fetch icons for
 * @returns {Array<{tech: string, url: string}>} Array of objects containing tech name and icon URL
 */
function useTechIcons(stack: string[]) {
  const [icons, setIcons] = useState<{ tech: string; url: string }[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const logos = await getTechLogos(stack);
      setIcons(logos);
    };
    fetchIcons();
  }, [stack]);

  return icons;
}

export default useTechIcons;
