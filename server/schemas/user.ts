import { z } from "zod";
import { emailSchema } from "./auth";
import { Role } from "@prisma/client";

// Role enum validation
export const roleSchema = z.enum([Role.ADMIN, Role.AGENT]);

// Update user schema (for admin - includes role)
export const updateUserSchema = z.object({
  email: emailSchema,
  name: z.string().nullable(),
  role: roleSchema,
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
