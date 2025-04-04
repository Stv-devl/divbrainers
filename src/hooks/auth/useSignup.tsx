import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  SignupSchemaType,
  signupValidationSchema,
} from '../../shema/signupShema';
import postSignup from '../../service/auth/postSignup';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

/**
 * Custom hook for handling user sign-up functionality.
 * Manages form state, validates form data, and submits the sign-up request.
 * @returns {UseSignUpReturn} An object containing handleSubmit, handleChange, handleGoogleSignIn, formData, signupErrors, isLoading
 **/
const useSignUp = () => {
  const router = useRouter();

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
        setError('email', {
          message: 'Signup process encountered an error',
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('email', {
        message: 'Something went wrong. Please try again.',
      });
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
    isSubmitting,
  };
};

export default useSignUp;
