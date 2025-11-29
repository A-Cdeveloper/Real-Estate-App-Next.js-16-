/**
 * Ensure Admin Access
 * Verifies that the current user has admin role
 * Throws an error if the user is not an admin
 * Use this in server actions to protect admin-only operations
 * @throws {Error} If the user is not an admin
 */
import { checkIsAdmin } from "./checkIsAdmin";

export async function ensureAdminAccess(): Promise<void> {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
}
