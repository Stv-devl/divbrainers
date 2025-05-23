'use client';

import React from 'react';
import useResetPassword from '@/hooks/auth/useResetPassword';
import Button from '../../../components/ui/buttons/Button';
import InputWithIcon from '../../../components/ui/form/input/InputWithIcon';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * PswBackup page component that handles user authentication
 * @component
 * @returns {JSX.Element} The rendered PswBackup page component with form inputs and authentication options
 */

const NewPassword = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useResetPassword();

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <h1 className="font-color-theme text-2xl font-bold">New password</h1>
        <p>Write your new password</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-1 relative">
            <InputWithIcon
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              IconComponent={iconsMap.IconPassword}
              error={errors.password?.message || ''}
              registration={register('password')}
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <InputWithIcon
              name="repeat"
              label="Repeat password"
              placeholder="Repeat your password"
              type="password"
              autoComplete="current-password"
              IconComponent={iconsMap.IconPassword}
              error={errors.repeat?.message || ''}
              registration={register('repeat')}
            />
          </div>
        </div>
        <div className="h-[46px] w-full">
          <Button
            label={'Change password'}
            color={'filled'}
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  );
};

export default NewPassword;
