import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { postResetPassword } from '@/service/auth/postResetPassword';
import {
  getNewPasswordSchema,
  NewPasswordSchemaType,
} from '../../../lib/schema/newPasswordSchema';

const useResetPassword = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(getNewPasswordSchema(t)),
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

      const parsed = getNewPasswordSchema(t).safeParse(data);

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
