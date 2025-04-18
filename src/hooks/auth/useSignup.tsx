import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SignupSchemaType,
  signupValidationSchema,
} from '../../../lib/schema/signupSchema';
import postSignup from '../../service/auth/postSignup';

/**
 * Custom hook for handling user sign-up functionality.
 * Manages form state, validates form data, and submits the sign-up request.
 * @returns {UseSignUpReturn} An object containing handleSubmit, handleChange, handleGoogleSignIn, formData, signupErrors, isLoading
 **/
const useSignUp = () => {
  const router = useRouter();

  const [globalError, setGlobalError] = useState('');

  console.log('globalerror', globalError);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupValidationSchema),
  });

  const onSubmit = async (data: SignupSchemaType) => {
    try {
      await postSignup(data.email, data.password);

      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        router.push('/home');
      } else {
        setGlobalError('Signup process encountered an error');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup error', error.message);
        setGlobalError('Something went wrong. Please try again.');
      } else {
        console.error('Signup unknown error:', error);
        setGlobalError('Something went wrong. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/home' });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleGoogleSignIn,
    errors,
    globalError,
    isSubmitting,
  };
};

export default useSignUp;
