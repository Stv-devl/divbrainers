'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import { handleError } from '../helpers/errors/handleError';
import { prisma } from '../prisma';
import { stackShema } from '../schema/stackShema';

/**
 * Update the user stack
 * @param stack - The technical stack
 * @returns The updated user profile
 */
export async function updateUserStack(stack: string[]) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Not authenticated');

  const validationResult = stackShema.safeParse({
    stack: stack,
  });

  if (!validationResult.success) {
    handleError(
      400,
      validationResult.error.issues[0]?.message || 'Invalid input data'
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { dataId: true },
  });

  if (!user?.dataId) {
    throw handleError(404, 'User data not found');
  }

  const updated = await prisma.data.update({
    where: { id: user.dataId },
    data: {
      stack,
    },
  });

  //have to see how to do whith other pages
  revalidatePath('/interview');

  return updated;
}
