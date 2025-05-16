import React from 'react';

interface AddYourResumeProps {
  onFileChange: (file: File | null) => void;
  error?: { resume?: string };
}

/**
 * UploadFile component that allows users to upload files and organize them in folders
 * @component
 * @returns {JSX.Element} The rendered UploadFile component with file upload form and folder selection
 */
const AddYourResume: React.FC<AddYourResumeProps> = ({
  onFileChange,
  error,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
  };

  const browseClass =
    'file:border-blue-700 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100 file:rounded-lg file:border file:bg-white file:font-regular file:mr-3 file:px-2 file:py-1 file:duration-500 file:ease-in-out file:sm:mr-5 file:sm:px-3 file:sm:py-1.5 file:sm:font-semibold';

  return (
    <div>
      <h1 className="text-blue-800 font-semibold pb-4 text-center sm:pb-7">
        Upload a document :
      </h1>
      <div className="w-full">
        <div className="flex w-full flex-col gap-2 pb-4 sm:pb-6">
          <label htmlFor="browseFile">Browse your resume :</label>
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
