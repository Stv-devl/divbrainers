'use client';

import Link from 'next/link';
import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import Loading from '../../../components/loading/Loading';
import Button from '../../../components/ui/buttons/Button';
import InputWithIcon from '../../../components/ui/form/input/InputWithIcon';
import { iconsMap } from '../../../constante/iconsMap';
import useLogin from '../../../hooks/auth/useLogin';

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

  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <h1 className="font-color-theme text-2xl font-bold">
          {t('login.title')}
        </h1>
        <p>{t('login.subtitle')}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
        role="form"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-1">
            <InputWithIcon
              registration={register('email')}
              name="email"
              label={t('login.form.email.label')}
              placeholder={t('login.form.email.placeholder')}
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
              label={t('login.form.password.label')}
              placeholder={t('login.form.password.placeholder')}
              type="password"
              error={errors.password?.message || ''}
              autoComplete="current-password"
              IconComponent={iconsMap.IconPassword}
            />
            <Link
              href="/sendlink"
              className="absolute top-0.5 right-0 text-dark-blue font-semibold"
            >
              {t('login.form.forgot')}
            </Link>
          </div>
        </div>

        {isSubmitting && <Loading />}

        <div className="mt-4 h-[46px] w-full">
          <Button
            label={t('login.form.submit')}
            type="submit"
            color="filled"
            disabled={isSubmitting}
          />
        </div>

        <div className="h-[46px] w-full">
          <Button
            label={t('login.form.google')}
            onClick={handleGoogleSignIn}
            color="empty"
            IconComponent={iconsMap.IconGoogle}
            disabled={isSubmitting}
          />
        </div>

        <p className="px-[5%] sm:px-[10%]">
          {t('login.footerLogin.noAccount')}{' '}
          <Link href="/signup">
            <span className="text-dark-blue font-semibold">
              {t('login.footerLogin.create')}
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
