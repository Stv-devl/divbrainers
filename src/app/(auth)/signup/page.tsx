'use client';

import Link from 'next/link';
import React from 'react';
import Loading from '../../../components/loading/Loading';
import Button from '../../../components/ui/buttons/Button';
import InputWithIcon from '../../../components/ui/form/input/InputWithIcon';
import { iconsMap } from '../../../constante/iconsMap';
import useSignUp from '../../../hooks/auth/useSignup';

/**
 * Signup page component
 * @returns The signup page component
 */

const SignUp = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    handleGoogleSignIn,
    errors,
    globalError,
    isSubmitting,
  } = useSignUp();

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <h1 className="font-color-theme text-2xl font-bold">Create account</h1>
        <p>Let&apos;s get you started sharing your links!</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
        role="form"
      >
        <div className="flex flex-col gap-1">
          <InputWithIcon
            registration={register('email')}
            name="email"
            label="Email address"
            placeholder="Write your email"
            type="text"
            autoComplete="email"
            IconComponent={iconsMap.IconEmail}
            error={errors.email?.message || ''}
          />
        </div>
        <div className="flex flex-col gap-1">
          <InputWithIcon
            registration={register('password')}
            name="password"
            label="Password"
            placeholder="At least 8 characters"
            type="password"
            autoComplete="new-password"
            IconComponent={iconsMap.IconPassword}
            error={errors.password?.message || ''}
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <InputWithIcon
            registration={register('repeat')}
            name="repeat"
            label="Confirm password"
            placeholder="At least 8 characters"
            type="password"
            error={errors.repeat?.message || ''}
            autoComplete="new-password"
            IconComponent={iconsMap.IconPassword}
          />
          {globalError && (
            <p className="absolute top-20 right-0 text-red-500 text-sm sm:text-base">
              {globalError}
            </p>
          )}
        </div>

        {isSubmitting && <Loading />}
        <div className="mt-4 h-[46px] w-full">
          <Button
            label={'Create a new account'}
            color={'filled'}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
        <div className="h-[46px] w-full">
          <Button
            label={'Signup with Google'}
            onClick={handleGoogleSignIn}
            color={'empty'}
            IconComponent={iconsMap.IconGoogle}
            disabled={isSubmitting}
          />
        </div>
        <p className="px-[5%] text-center sm:px-[10%] ">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-dark-blue font-bold transition-all duration-300">
              Login
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
