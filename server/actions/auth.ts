"use server";

import { randomBytes } from "crypto";
import prisma from "@/server/prisma";
import { getPrismaErrorMessage } from "@/server/prisma-errors";
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/server/schemas/auth";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import { createSession, deleteSession } from "@/server/auth/session";
import { formatZodErrors } from "@/server/utils/zod";
import { sendPasswordResetEmail } from "@/server/mail/sendPasswordResetEmail";

import type {
  LoginResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from "@/types/auth";

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

/**
 * Server Action: Request password reset
 * Generates reset token and sends email with reset link
 */
export async function forgotPasswordAction(
  prevState: ForgotPasswordResponse | null,
  formData: FormData
): Promise<ForgotPasswordResponse> {
  const rawData = {
    email: formData.get("email"),
  };

  const result = forgotPasswordSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        email: String(rawData.email || ""),
      },
    };
  }

  const { email } = result.data;

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
        },
      };
    }

    // Generate reset token (32 bytes = 64 hex characters)
    const resetToken = randomBytes(32).toString("hex");

    // Set expiry to 1 hour from now
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    // Update user with reset token and expiry
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetTokenExpiry: resetTokenExpiry,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail({
      email: user.email,
      resetToken,
    });

    return {
      success: true,
      message:
        "If an account with that email exists, we've sent a password reset link.",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      errors: {
        _general: [getPrismaErrorMessage(error)],
      },
      data: {
        email,
      },
    };
  }
}

/**
 * Server Action: Reset password
 * Validates token, checks expiry, and updates password
 */
export async function resetPasswordAction(
  prevState: ResetPasswordResponse | null,
  formData: FormData
): Promise<ResetPasswordResponse> {
  const rawData = {
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    token: formData.get("token"),
  };

  const result = resetPasswordSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      errors: formatZodErrors(result.error),
      data: {
        password: String(rawData.password || ""),
        confirmPassword: String(rawData.confirmPassword || ""),
      },
    };
  }

  const { password, token } = result.data;

  try {
    // Find user by reset token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
      },
    });

    if (!user) {
      return {
        success: false,
        errors: {
          _general: ["Invalid or expired reset token"],
        },
        data: {
          password: "",
          confirmPassword: "",
        },
      };
    }

    // Check if token has expired
    if (
      !user.passwordResetTokenExpiry ||
      user.passwordResetTokenExpiry < new Date()
    ) {
      return {
        success: false,
        errors: {
          _general: ["Reset token has expired. Please request a new one."],
        },
        data: {
          password: "",
          confirmPassword: "",
        },
      };
    }

    // Hash new password
    const hashedPassword = await hashPassword(password);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiry: null,
      },
    });

    return {
      success: true,
      message:
        "Password reset successfully. You can now login with your new password.",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      errors: {
        _general: [getPrismaErrorMessage(error)],
      },
      data: {
        password: "",
        confirmPassword: "",
      },
    };
  }
}
