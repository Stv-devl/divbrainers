import { postSendEmail } from '@/service/auth/postSendEmail';
import { sendLinkSchema, SendLinkSchemaType } from '@/shema/sendLinkShema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const useSendLink = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SendLinkSchemaType>({
    resolver: zodResolver(sendLinkSchema),
  });

  const onSubmit = async (data: SendLinkSchemaType) => {
    try {
      const result = await postSendEmail(data.email);
      if (result?.error) {
        setError('email', {
          message: result.error || 'An error occurred',
        });
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.error('Send email error:', err);
      setError('email', { message: 'Failed to send email' });
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

export default useSendLink;
