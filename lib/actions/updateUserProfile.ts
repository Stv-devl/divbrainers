'use server';

import { prisma } from '../prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import { uploadFileToCloudinary } from '../utils/fileOperations/uploadFileToCloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { profileSchema } from '../shema/profileShema';
import { handleError } from '../utils/errors/handleError';

/**
 * Update the user profile
 * @param formData - The form data
 * @returns The updated user profile
 */
export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error('Not authenticated');

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const imageFile = formData.get('image') as File;

  const validationResult = profileSchema.safeParse({
    firstname: name,
    email: email,
    image: null,
  });

  if (!validationResult.success) {
    handleError(
      400,
      validationResult.error.issues[0]?.message || 'Invalid input data'
    );
  }

  let imageUrl: string | null = null;
  let publicId: string | null = null;

  if (imageFile && typeof imageFile === 'object') {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

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

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      email,
      ...(imageUrl && { image: imageUrl }),
      ...(publicId && { imagePublicId: publicId }),
    },
  });

  revalidatePath('/profile');
}
