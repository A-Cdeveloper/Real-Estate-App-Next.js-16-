"use server";

import { Role } from "@prisma/client";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";
import { CurrentUser, UpdateUser } from "@/types/user";
import { hashPassword } from "../auth/password";
import { updateUserSchema } from "../schemas/user";
import { formatZodErrors } from "../utils/zod";
import { ensureAdminAccess } from "../auth/ensureAdminAccess";

export type UserActionState<TData = unknown> =
  | { success: true; user?: CurrentUser }
  | {
      success: false;
      errors?: Record<string, string[]>;
      error?: string;
      data?: TData;
    };

/**
 * Server Action: Update a user (admin - includes role)
 */
export async function updateUser(
  prevState: UserActionState<UpdateUser> | null,
  formData: FormData
): Promise<UserActionState<UpdateUser> | null> {
  await ensureAdminAccess();
  const userId = formData.get("id") as string;
  if (!userId) {
    return {
      success: false,
      error: "User ID is required.",
    };
  }

  const rawData = {
    email: formData.get("email"),
    name: formData.get("name") || null,
    role: formData.get("role"),
    password: formData.get("password") || undefined,
  };

  const result = updateUserSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: userId,
        email: String(rawData.email || ""),
        name: rawData.name ? String(rawData.name) : null,
        role: String(rawData.role || "AGENT") as UpdateUser["role"],
        password: undefined,
      },
    };
  }

  const { email, name, role, password } = result.data;

  try {
    const updateData: {
      email: string;
      name: string | null;
      role: Role;
      password?: string;
    } = {
      email,
      name,
      role,
    };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/users");

    // Remove sensitive fields
    const currentUser: CurrentUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      isOnline: updatedUser.isOnline,
      lastLogin: updatedUser.lastLogin,
      createdAt: updatedUser.createdAt,
    };

    return { success: true, user: currentUser };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: getPrismaErrorMessage(error),
      data: {
        id: userId,
        email,
        name,
        role,
        password: undefined,
      },
    };
  }
}
