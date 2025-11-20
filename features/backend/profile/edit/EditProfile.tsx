"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomInput from "@/components/shared/CustomInput";
import CustomSelect from "@/components/shared/CustomSelect";
import IconButton from "@/components/shared/IconButton";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "@/lib/constants";
import { CurrentUser } from "@/types/user";
import { X } from "lucide-react";

/**
 * EditProfile component
 * Displays a form for editing the user's profile
 * @param currentUser - The current user data
 * @param onClose - Callback function to close the edit form
 */
const EditProfile = ({
  currentUser,
  onClose,
}: {
  currentUser: CurrentUser;
  onClose: () => void;
}) => {
  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">User not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Edit Form Layout */}
        <Card className="h-fit border-primary/50">
          <CardHeader className="relative">
            <IconButton
              type="button"
              variant="ghost"
              icon={X}
              label="Close edit form"
              className="absolute right-4 -top-2 h-6 w-6 [&>span]:hidden"
              onClick={onClose}
            />
            <CardTitle className="text-lg">{currentUser.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Update your account information here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              <CustomInput
                id="profile-full-name"
                label="Full Name"
                placeholder="Enter your full name"
                defaultValue={currentUser.name ?? ""}
                labelClassName="text-sm font-medium text-muted-foreground"
              />

              <CustomInput
                id="profile-email"
                type="email"
                label="Email Address"
                placeholder="name@example.com"
                defaultValue={currentUser.email}
                labelClassName="text-sm font-medium text-muted-foreground"
              />

              <CustomSelect
                id="profile-role"
                label="Role"
                placeholder="Select a role"
                value={currentUser.role}
                options={USER_ROLE_OPTIONS}
                labelClassName="text-sm font-medium text-muted-foreground"
              />

              <CustomSelect
                id="profile-status"
                label="Status"
                placeholder="Select status"
                value={currentUser.isActive ? "active" : "inactive"}
                options={USER_STATUS_OPTIONS}
                labelClassName="text-sm font-medium text-muted-foreground"
              />

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;
