import prisma from "@/server/prisma";
import { AddUser, CurrentUser, UpdateUser } from "@/types/user";
import { hashPassword } from "../auth/password";

/**
 * Fetches all users with the fields needed for backend profile views.
 */
export const getUsers = async (): Promise<CurrentUser[]> => {
  return prisma.user.findMany();
};

/**
 * Fetches a user profile by id with the fields needed for backend profile views.
 */

export async function getUserById(userId: string): Promise<CurrentUser | null> {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

/**
 * Adds a new user to the database.
 */
export const addUser = async (user: AddUser): Promise<CurrentUser> => {
  return prisma.user.create({
    data: {
      email: user.email,
      password: await hashPassword(user.password || ""),
      name: user.name,
      role: user.role,
      isActive: false,
      lastLogin: null,
      createdAt: new Date(),
    },
  });
};

/**
 * Updates a user in the database.
 */
export const updateUser = async (user: UpdateUser): Promise<CurrentUser> => {
  return prisma.user.update({
    where: { id: user.id },
    data: {
      email: user.email,
      name: user.name,
      role: user.role,
      password: user.password ? await hashPassword(user.password) : undefined,
    },
  });
};

/**
 * Deletes a user from the database.
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await prisma.user.delete({
    where: { id: userId },
  });
};
