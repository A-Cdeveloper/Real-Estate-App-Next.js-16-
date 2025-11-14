"use server";

import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import { loginSchema } from "@/server/schemas/auth";
import { verifyPassword } from "@/server/auth/password";
import { createSession, deleteSession } from "@/server/auth/session";
import type { LoginResponse } from "@/types/auth";

/**
 * Server Action: Login user
 */
export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    // Validate input
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0].message,
      };
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validationResult.data.email },
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Verify password
    const isPasswordValid = await verifyPassword(
      validationResult.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

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
      error: getPrismaErrorMessage(error),
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
