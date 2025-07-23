import { TFunction } from 'i18next';
import React from 'react';

interface AddYourResumeProps {
  onFileChange: (file: File | null) => void;
  error?: { resume?: string };
  t: TFunction;
}

/**
 * UploadFile component that allows users to upload files and organize them in folders
 * @component
 * @returns {JSX.Element} The rendered UploadFile component with file upload form and folder selection
 */
const AddYourResume: React.FC<AddYourResumeProps> = ({
  onFileChange,
  error,
  t,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
  };

  const browseClass =
    'file:border-blue-800 file:text-blue-800 file:cursor-pointer hover:file:bg-blue-50 file:rounded-lg file:border file:bg-white file:font-regular file:mr-3 file:px-2 file:py-1 file:duration-500 file:ease-in-out file:sm:mr-8 file:sm:px-3 file:sm:py-1.5 file:sm:font-semibold';

  return (
    <div
      className="w-full space-y-4
     sm:bg-white sm:p-8 sm:rounded-lg sm:shadow-sm"
    >
      <h4 className="text-xl font-semibold text-blue-800">
        {t('atsScan.addResume.title')}
      </h4>
      <div className="w-full">
        <div className="flex w-full flex-col gap-3">
          <label htmlFor="browseFile">{t('atsScan.addResume.label')}</label>
          <input
            id="browseFile"
            type="file"
            className={browseClass}
            onChange={handleFileChange}
          />
          {error && <span className="text-red-500">{error.resume}</span>}
        </div>
      </div>
    </div>
  );
};

export default AddYourResume;
