import PageHeader from "@/components/backend/layout/PageHeader";
import { Users } from "lucide-react";
import AllUsers from "@/features/backend/users/AllUsers";
import { getUsers } from "@/server/queries/users";
import { adminGuard } from "@/server/auth/adminGuard";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UsersPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  // Check if the user is an admin
  await adminGuard();
  const params = await searchParams;
  const { users, total, page, totalPages } = await getUsers({
    page: Number(params.page) || 1,
    sort: (params.sort as string) || "role_asc",
  });
  const currentUser = await getCurrentUserFromSession();
  return (
    <div>
      <PageHeader title="Users" icon={Users} />
      <AllUsers
        users={users}
        total={total}
        currentUserId={currentUser?.id as string}
        totalPages={totalPages}
        page={+page}
        sort={(params.sort as string) || "role_asc"}
      />
    </div>
  );
};

export default UsersPage;
