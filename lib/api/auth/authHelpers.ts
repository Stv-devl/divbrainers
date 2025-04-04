import bcrypt from 'bcryptjs';
import { prisma } from '../../prisma';

/**
 * Fetches a user from the database by their email address
 * @param email - The email address to search for
 * @returns The user object if found, null otherwise
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        credentials: true,
      },
    });

    return user;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw new Error('Impossible to retrieve user');
  }
};

/**
 * Verifies if an input password matches a stored hashed password
 * @param inputPassword - The password to verify
 * @param storedPassword - The hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw new Error('Password verification failed');
  }
};
