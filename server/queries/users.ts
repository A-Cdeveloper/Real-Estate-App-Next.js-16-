import prisma from "@/server/prisma";
import { CurrentUser } from "@/types/user";

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
