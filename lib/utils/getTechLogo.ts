import { iconStackMapping } from '@/constante/iconStackMap';

const techIconBaseURL = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const normalizeTechName = (tech: string) => {
  const key = tech
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[\s\-.]/g, '');
  return key in iconStackMapping ? key : null;
};

const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
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
