import prisma from "../prisma";

export async function validateResetToken(token: string) {
  // validate token
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
    },
  });
  if (!user) {
    return false;
  }
  if (
    user.passwordResetTokenExpiry &&
    user.passwordResetTokenExpiry < new Date()
  ) {
    return false;
  }
  return true;
}
