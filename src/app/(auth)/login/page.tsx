'use client';

import Link from 'next/link';
import React from 'react';
import Loading from '../../../componants/loading/Loading';
import Button from '../../../componants/buttons/Button';
import { iconsMap } from '../../../constante/iconsMap';
import useLogin from '../../../hooks/auth/useLogin';
import InputWithIcon from '../../../componants/form/InputWithIcon';

/**
 * Login page component that handles user authentication
 * @component
 * @returns {JSX.Element} The rendered login page component with form inputs and authentication options
 */

const Login = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    handleGoogleSignIn,
  } = useLogin();

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <h1 className="font-color-theme text-2xl font-bold">Login</h1>
        <p>Add your details below to get back into the app</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-1">
            <InputWithIcon
              registration={register('email')}
              name="email"
              label="Email address"
              placeholder="Write your email"
              type="text"
              error={errors.email?.message || ''}
              autoComplete="email"
              IconComponent={iconsMap.IconEmail}
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <InputWithIcon
              registration={register('password')}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              error={errors.password?.message || ''}
              autoComplete="current-password"
              IconComponent={iconsMap.IconPassword}
            />
            <Link
              href="/sendlink"
              className="absolute top-0.5 right-0 text-dark-blue font-semibold"
            >
              Forget your password?
            </Link>
          </div>
        </div>
        {isSubmitting && <Loading />}
        <div className="h-[46px] w-full ">
          <Button
            label="Login"
            type="submit"
            color="filled"
            disabled={isSubmitting}
          />
        </div>
        <div className="h-[46px] w-full ">
          <Button
            label="Login with Google"
            onClick={handleGoogleSignIn}
            color="empty"
            IconComponent={iconsMap.IconGoogle}
            disabled={isSubmitting}
          />
        </div>
        <p className="px-[5%] sm:px-[10%]">
          Don't have an account?{' '}
          <Link href="/signup">
            <span className="text-dark-blue font-semibold">Create account</span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
