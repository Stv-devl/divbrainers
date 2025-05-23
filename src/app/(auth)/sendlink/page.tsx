'use client';

import React from 'react';
import useSendLink from '@/hooks/auth/useSendLink';
import Button from '../../../components/ui/buttons/Button';
import InputWithIcon from '../../../components/ui/form/input/InputWithIcon';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * SendLink page component that handles user authentication
 * @component
 * @returns {JSX.Element} The rendered SendLink page component with form inputs and authentication options
 */

const SendLink = () => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useSendLink();

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <h1 className="font-color-theme text-2xl font-bold">
          Recover password
        </h1>
        <p>Enter your email to recover your password</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-1">
            <InputWithIcon
              name="email"
              label="Email address"
              placeholder="Write your email"
              type="text"
              autoComplete="email"
              IconComponent={iconsMap.IconEmail}
              error={errors.email?.message || ''}
              registration={register('email')}
            />
          </div>

          <div className="mt-4 h-[46px] w-full">
            <Button
              label={'Get a link to reset password'}
              color={'filled'}
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SendLink;
