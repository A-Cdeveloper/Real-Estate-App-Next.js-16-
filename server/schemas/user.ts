import { z } from "zod";
import { emailSchema } from "./auth";
import { Role } from "@prisma/client";

// Role enum validation
export const roleSchema = z.enum([Role.ADMIN, Role.AGENT]);

// Base user schema (shared fields)
const baseUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, "Name is required"),
  role: roleSchema,
  isActive: z.boolean(),
});

// Create user schema (password required)
export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Update user schema (password optional)
export const updateUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
