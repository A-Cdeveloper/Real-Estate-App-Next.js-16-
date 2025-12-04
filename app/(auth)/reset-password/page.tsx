import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { validateResetToken } from "@/server/auth/resetToken";
import { notFound } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { token } = await searchParams;

  if (!token || typeof token !== "string") {
    return notFound();
  }

  const isValid = await validateResetToken(token);
  if (!isValid) {
    return notFound();
  }

  return (
    <section className="flex justify-center items-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
};

export default ResetPassword;
