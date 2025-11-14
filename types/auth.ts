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
  error: string;
};

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

