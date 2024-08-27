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

export async function createUser(user: any): Promise<User | null> {
  try {
    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return createdUser;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateUser(username: string, props: any): Promise<User | null> {
  try {
    const updatedUser = await prisma.user.update({
      where: { username }, // Condition to find the user
      data: { ...props }, // New data to update
    });
    return updatedUser;
  } catch (error) {
    throw new Error('Database error');
  }
}