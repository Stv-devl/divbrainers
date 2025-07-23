'use client';

import Link from 'next/link';
import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
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
    isSubmitting,
  } = useSignUp();

  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <h1 className="font-color-theme text-2xl font-bold">
          {t('signup.title')}
        </h1>
        <p>{t('signup.subtitle')}</p>
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
            label={t('signup.form.email.label')}
            placeholder={t('signup.form.email.placeholder')}
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
            label={t('signup.form.password.label')}
            placeholder={t('signup.form.password.placeholder')}
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
            label={t('signup.form.repeat.label')}
            placeholder={t('signup.form.repeat.placeholder')}
            type="password"
            error={errors.repeat?.message || ''}
            autoComplete="new-password"
            IconComponent={iconsMap.IconPassword}
          />
        </div>

        {isSubmitting && <Loading />}

        <div className="mt-4 h-[46px] w-full">
          <Button
            label={t('signup.form.submit')}
            color="filled"
            type="submit"
            disabled={isSubmitting}
          />
        </div>

        <div className="h-[46px] w-full">
          <Button
            label={t('signup.form.google')}
            onClick={handleGoogleSignIn}
            color="empty"
            IconComponent={iconsMap.IconGoogle}
            disabled={isSubmitting}
          />
        </div>

        <p className="px-[5%] text-center sm:px-[10%] ">
          {t('signup.footerSignup.already')}{' '}
          <Link href="/login">
            <span className="text-dark-blue font-bold transition-all duration-300">
              {t('signup.footerSignup.login')}
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
