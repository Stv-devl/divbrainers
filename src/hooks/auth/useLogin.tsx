import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, LoginSchemaType } from '../../../lib/schema/loginShema';

const useLogin = () => {
  const [globalError, setGlobalError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/home',
      });

      if (result?.error) {
        setGlobalError('Email or password incorrect');
      }

      if (result?.ok) {
        window.location.href = result.url ?? '/home';
      }
    } catch (err) {
      console.log('on est la');
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
    globalError,
    isSubmitting,
    handleGoogleSignIn,
  };
};

export default useLogin;
