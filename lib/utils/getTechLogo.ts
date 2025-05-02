import { iconStackMapping } from '@/constante/iconStackMap';

const techIconBaseURL = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

/**
 * Normalizes a technology name to match the format in the iconStackMapping
 * @param tech - The technology name to normalize
 * @returns The normalized technology name or null if not found in the mapping
 */
const normalizeTechName = (tech: string) => {
  const key = tech
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[\s\-.]/g, '');
  return key in iconStackMapping ? key : null;
};

/**
 * Checks if an icon exists at the given URL
 * @param url - The URL of the icon to check
 * @returns A promise that resolves to true if the icon exists, false otherwise
 */
export const checkIconExists = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

export const getTechLogos = async (techArray: string[]) => {
  const results = await Promise.all(
    techArray.map(async (tech) => {
      const normalized = normalizeTechName(tech);

      if (!normalized) {
        return { tech, url: 'images/tech.svg' };
      }

      const originalUrl = `${techIconBaseURL}/${normalized}/${normalized}-original.svg`;
      const plainUrl = `${techIconBaseURL}/${normalized}/${normalized}-plain.svg`;

      if (await checkIconExists(originalUrl)) {
        return { tech, url: originalUrl };
      }

      if (await checkIconExists(plainUrl)) {
        return { tech, url: plainUrl };
      }

      return { tech, url: 'images/tech.svg' };
    })
  );

  return results;
};
