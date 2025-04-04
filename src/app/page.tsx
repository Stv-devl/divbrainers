'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from '../componants/loading/Loading';

/**
 * Home page component
 * Shows ProductShowcase for non-authenticated users
 * Redirects to dashboard for authenticated users
 * @returns {JSX.Element} The home page component
 */
export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    } else if (status === 'unauthenticated') {
      router.push('/entertain');
    }
  }, [status, router]);

  return <Loading />;
}
