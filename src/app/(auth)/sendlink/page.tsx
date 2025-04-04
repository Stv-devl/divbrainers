'use client';

import React from 'react';
import Loading from '../../../componants/loading/Loading';
import Button from '../../../componants/buttons/Button';
import { iconsMap } from '../../../constante/iconsMap';
import InputWithIcon from '../../../componants/form/InputWithIcon';
import useSendLink from '@/hooks/auth/useSendLink';

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

          {isSubmitting && <Loading />}
          <div className="mt-4 h-[46px] w-full">
            <Button
              label={'Get a link to reset password'}
              color={'filled'}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default SendLink;
