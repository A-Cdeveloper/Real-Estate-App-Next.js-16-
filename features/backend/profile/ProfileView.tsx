import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import ProfileContent from "./ProfileContent";
import ProfileCards from "./ProfileCards";

/**
 * ProfileView component
 * Server component that fetches user data and renders ProfileContent with ProfileCards
 * @returns The ProfileView component
 */
const ProfileView = async () => {
  const currentUser = await getCurrentUserFromSession();
  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <ProfileContent
      currentUser={currentUser}
      cards={<ProfileCards currentUser={currentUser} />}
    />
  );
};

export default ProfileView;
