'use client';

import Image from 'next/image';
import React, { useRef, useCallback } from 'react';
import { ProfilePictureWrapperProps } from '@/types/type';
import { cn } from '../../../lib/utils/cn';
import IconUploadImage from '../../icons/pages/IconUploadImage';

const MAX_FILE_SIZE_MB = 5;
const MAX_IMAGE_DIMENSION = 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

/**
 * PictureWrapper: Component for uploading profile picture.
 * @param {string | null} imagePreview - Image preview (local URL).
 * @param {(file: File) => void} handleImageChange - Callback to update local image state.
 */
const PictureWrapper: React.FC<ProfilePictureWrapperProps> = ({
  imagePreview,
  handleImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const havePicture = !!imagePreview;

  /**
   * Checks the file format.
   */
  const validateFile = (file: File) => {
    const isValidFormat = SUPPORTED_FORMATS.includes(file.type);
    const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;

    if (!isValidFormat) {
      alert('Please upload an image in JPG or PNG format.');
      return false;
    }

    if (!isValidSize) {
      alert(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }

    return true;
  };

  /**
   * On clicks on the image, it triggers the hidden file input.
   */
  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Handles file selection, then, if validated,
   * calls the handleImageChange function provided by the hook.
   */
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && validateFile(file)) {
        const img = new window.Image();
        img.onload = () => {
          if (
            img.width <= MAX_IMAGE_DIMENSION &&
            img.height <= MAX_IMAGE_DIMENSION
          ) {
            handleImageChange(file);
          } else {
            alert(
              `Image dimensions should be less than ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION}px.`
            );
          }
          URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(file);
      }
    },
    [handleImageChange]
  );

  return (
    <div className="flex flex-col justify-around gap-4 rounded-lg p-5 sm:flex-row sm:items-center sm:gap-5">
      <p className="w-[110px]">Profile picture</p>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div
          className="bg-blue-100 relative flex size-[133px] cursor-pointer flex-col center 
                     gap-2 overflow-hidden rounded-xl lg:size-[193px]"
          onClick={handleImageClick}
          role="button"
          aria-label="Upload Profile Picture"
        >
          <div className="relative size-[133px] rounded-xl lg:size-[193px]">
            <IconUploadImage
              className={cn(
                'font-color-theme absolute left-[48px] top-[40px] lg:left-[75px] lg:top-[60px] z-10 size-[40px] opacity-60',
                havePicture ? 'text-white' : 'text-blue-900'
              )}
            />
            {havePicture && (
              <Image
                src={imagePreview as string}
                alt="Profile"
                width={193}
                height={193}
                className="absolute z-0 size-[133px] object-cover lg:size-[193px]"
                priority
              />
            )}
            <p
              className={cn(
                'text-sm lg:text-base font-semibold absolute z-2 left-[16px] top-[85px] lg:left-[38px] lg:top-[115px] opacity-80',
                havePicture ? 'text-white absolute' : 'text-blue-900 absolute'
              )}
            >
              {havePicture ? 'Change image' : 'Upload a picture'}
            </p>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <p className="text-sm">
        Image must be below 1024x1024px. Use PNG or JPG format.
      </p>
    </div>
  );
};

export default PictureWrapper;
