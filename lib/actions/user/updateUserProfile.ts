'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { uploadFileToCloudinary } from '../../helpers/fileOperations/uploadFileToCloudinary';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';
import { profileSchema } from '../../schema/profileShema';

/**
 * Update the user profile
 * @param formData - The form data
 * @returns The updated user profile
 */
export async function updateUserProfile(formData: FormData) {
  const session = await getCurrentSession();

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const imageFile = formData.get('image') as File;

  const validationResult = profileSchema.safeParse({
    name,
    email,
    image: null,
  });

  if (!validationResult.success) {
    handleServerActionError(
      400,
      validationResult.error.issues[0]?.message || 'Invalid input data'
    );
  }

  let imageUrl: string | null = null;
  let publicId: string | null = null;

  if (imageFile && typeof imageFile === 'object') {
    if (!imageFile.type.startsWith('image/')) {
      throw handleServerActionError(400, 'File must be an image');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) redirect('/login');

    if (user?.imagePublicId) {
      await cloudinary.uploader.destroy(user.imagePublicId, {
        resource_type: 'image',
      });
    }

    const buffer = await imageFile.arrayBuffer();
    const result = await uploadFileToCloudinary({
      name: imageFile.name,
      type: imageFile.type,
      arrayBuffer: async () => buffer,
    });

    imageUrl = result?.secure_url ?? null;
    publicId = result?.public_id ?? null;
  }

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      email,
      ...(imageUrl && { image: imageUrl }),
      ...(publicId && { imagePublicId: publicId }),
    },
  });

  revalidatePath('/profile');
  return updatedUser;
}
