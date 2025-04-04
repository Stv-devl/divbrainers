import { postResetPassword } from '@/service/auth/postResetPassword';
import {
  newPasswordSchema,
  NewPasswordSchemaType,
} from '@/shema/newPasswordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useResetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = async (data: NewPasswordSchemaType) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const email = urlParams.get('email');

      if (!token || !email) {
        setError('password', {
          message: 'Invalid or missing token/email in URL',
        });
        return;
      }

      const parsed = newPasswordSchema.safeParse(data);

      if (!parsed.success) {
        setError('password', {
          message: parsed.error.issues[0]?.message || 'Invalid data',
        });
        return;
      }

      const fullData = {
        email,
        token,
        password: parsed.data.password,
      };

      const result = await postResetPassword(fullData);

      if (!result?.ok) {
        setError('password', {
          message: result.error || 'An error occurred',
        });
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Reset error:', error);
      setError('password', {
        message: 'Failed to reset password',
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
};

export default useResetPassword;
