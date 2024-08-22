import { User } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function findUserByUsername(username: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    throw new Error('Database error');
  }
}