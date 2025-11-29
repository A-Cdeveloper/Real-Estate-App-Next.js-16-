// server/auth/checkIsAdmin.ts
import { getCurrentUserFromSession } from "./getCurrentUserFromSession";

export async function checkIsAdmin(): Promise<boolean> {
  const user = await getCurrentUserFromSession();
  return user?.role === "ADMIN";
}
