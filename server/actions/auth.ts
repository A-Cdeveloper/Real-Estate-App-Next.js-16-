"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { loginSchema } from "@/server/schemas/auth";
import { verifyPassword } from "@/server/auth/password";
import { createSession, deleteSession } from "@/server/auth/session";
import { formatZodErrors } from "@/server/utils/zod";

import type { LoginResponse } from "@/types/auth";

/**
 * Server Action: Login user
 */

export async function loginAction(
  prevState: LoginResponse | null,
  formData: FormData
): Promise<LoginResponse> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        email: String(rawData.email || ""),
        password: String(rawData.password || ""),
      },
    };
  }

  const { email, password } = result.data;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: false,
        errors: {
          email: ["No user found with this email address"],
        },
        data: {
          email,
          password: "",
        },
      };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        errors: {
          _general: ["Wrong password"],
        },
        data: {
          email,
          password,
        },
      };
    }

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Create session
    await createSession(user.id, user.role);

    // Return success with user data (without password)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: {
        _general: [getPrismaErrorMessage(error)],
      },
      data: {
        email,
        password: "",
      },
    };
  }
}

/**
 * Server Action: Logout user
 */
export async function logout(): Promise<{ success: true }> {
  await deleteSession();
  return { success: true };
}
