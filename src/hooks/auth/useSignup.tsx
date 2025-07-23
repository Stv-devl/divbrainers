import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  getSignupSchema,
  SignupSchemaType,
} from '../../../lib/schema/signupSchema';
import postSignup from '../../service/auth/postSignup';

/**
 * Custom hook for handling user sign-up functionality.
 * Manages form state, validates form data, and submits the sign-up request.
 * @returns {UseSignUpReturn} An object containing handleSubmit, handleChange, handleGoogleSignIn, formData, signupErrors, isLoading
 **/
const useSignUp = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema(t)),
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
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Signup error', error.message);
      } else {
        console.error('Signup unknown error:', error);
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
    isSubmitting,
  };
};

export default useSignUp;
