import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginSchemaType } from '@/shema/loginShema';

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const result = await signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: '/home',
      });

      if (result?.error) {
        setError('email', { message: result.error });
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
