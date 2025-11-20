import ProfileView from "@/features/backend/profile/ProfileView";
import PageHeader from "@/components/backend/layout/PageHeader";
import { UserIcon } from "lucide-react";

/**
 * ProfilePage component
 * Displays the user's profile page
 * @returns {React.ReactNode} The ProfilePage component
 */
const ProfilePage = () => {
  return (
    <div>
      <PageHeader title="Profile" icon={UserIcon} />
      <ProfileView />
    </div>
  );
};

export default ProfilePage;
