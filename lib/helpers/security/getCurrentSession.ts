'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/authOptions';

/**
 * Retrieves the current session for the authenticated user
 * @returns The current session or redirects to the login page if no session is found
 */
export async function getCurrentSession() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return session;
}
