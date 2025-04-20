import { useState, useEffect } from 'react';

export function useProfileImage(image: string | null | undefined) {
  const [imageError, setImageError] = useState(false);

  const isValidImage = typeof image === 'string' && image.trim() !== '';
  const profileImage =
    imageError || !isValidImage ? '/images/default-avatar.png' : image;

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    setImageError(false);
  }, [image]);

  return {
    profileImage,
    imageError,
    handleImageError,
  };
}
