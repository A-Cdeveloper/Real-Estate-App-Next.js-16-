import { Role } from "@prisma/client";

export type LoginUser = {
  id: string;
  email: string;
  role: Role;
};

export type LoginSuccessResponse = {
  success: true;
  user: LoginUser;
};

export type LoginErrorResponse = {
  success: false;
  error?: string; // General error message (for backward compatibility)
  errors?: Record<string, string[]>; // Field-level errors
  data?: {
    email: string;
    password: string;
  };
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
