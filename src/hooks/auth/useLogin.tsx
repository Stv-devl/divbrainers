import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getLoginSchema,
  LoginSchemaType,
} from '../../../lib/schema/loginShema';

const useLogin = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(getLoginSchema(t)),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/home',
      });

      if (result?.ok) {
        window.location.href = result.url ?? '/home';
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', {
      redirect: true,
      callbackUrl: '/home',
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    handleGoogleSignIn,
  };
};

export default useLogin;
