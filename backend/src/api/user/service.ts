import { User, UserRole } from '@prisma/client';
import prisma from '../../lib/prisma';

interface UserWRole extends User {
  role?: UserRole;
}

export async function findUserByUsername(username: string): Promise<UserWRole | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        role: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findUserByUsernameLogin(username: string): Promise<UserWRole | null> {
  try {
    const today = new Date();
    const user = await prisma.user.findUnique({
      where: { 
        username,
        deleted: false,
        effective_to: {
          gte: today,
        },
        effective_from: {
          lte: today,
        },
      },
      include: {
        role: true,
      },
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

export async function findUserByEmployeeId(id: number): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: { employee_id: id }, // Condition to find the user
    });
    return user;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findUserByStoreId(id: number): Promise<User | null> {
  try {
    const user = await prisma.user.findFirst({
      where: { store_id: id }, // Condition to find the user
    });
    return user;
  } catch (error) {
    throw new Error('Database error');
  }
}