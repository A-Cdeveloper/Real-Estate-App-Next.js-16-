"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { revalidatePath } from "next/cache";
import { CurrentUser } from "@/types/user";
import { UpdateProfile, ProfileActionState } from "@/types/profile";
import { hashPassword } from "../auth/password";
import { updateProfileSchema } from "../schemas/profile";
import { formatZodErrors } from "../utils/zod";
import { getSession } from "../auth/session";

/**
 * Server Action: Update user profile (no role change)
 */
export async function updateProfile(
  prevState: ProfileActionState<UpdateProfile> | null,
  formData: FormData
): Promise<ProfileActionState<UpdateProfile> | null> {
  // Get user ID from session
  const session = await getSession();
  if (!session?.userId) {
    return {
      success: false,
      error: "Unauthorized. Please log in.",
    };
  }

  const rawData = {
    email: formData.get("email"),
    name: formData.get("name") || null,
    password: formData.get("password") || undefined,
  };

  const result = updateProfileSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        id: session.userId,
        email: String(rawData.email || ""),
        name: rawData.name ? String(rawData.name) : null,
        password: undefined,
      },
    };
  }

  const { email, name, password } = result.data;
  const userId = session.userId;

  try {
    const updateData: {
      email: string;
      name: string | null;
      password?: string;
    } = {
      email,
      name,
    };

    if (password) {
      updateData.password = await hashPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/profile");
    revalidatePath("/users");

    // Remove sensitive fields
    const currentUser: CurrentUser = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
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
        password: undefined,
      },
    };
  }
}

