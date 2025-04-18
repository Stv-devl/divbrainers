import { iconStackMapping } from '@/constante/iconStackMap';

const techIconBaseURL = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const normalizeTechName = (tech: string) => {
  const key = tech
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[\s\-.]/g, '');
  return key in iconStackMapping ? key : null;
};

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
