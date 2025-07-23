'use client';

import React from 'react';
import useResetPassword from '@/hooks/auth/useResetPassword';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
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

  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <h1 className="font-color-theme text-2xl font-bold">
          {t('resetPassword.title')}
        </h1>
        <p>{t('resetPassword.subtitle')}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-[20px]"
        role="form"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-1 relative">
            <InputWithIcon
              name="password"
              label={t('resetPassword.form.password.label')}
              placeholder={t('resetPassword.form.password.placeholder')}
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
              label={t('resetPassword.form.repeat.label')}
              placeholder={t('resetPassword.form.repeat.placeholder')}
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
            label={t('resetPassword.form.submit')}
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
