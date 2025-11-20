"use client";

import { Activity, useState } from "react";
import { CurrentUser } from "@/types/user";
import EditProfile from "./edit/EditProfile";
import ProfileActionsButtons from "./ProfileActionsButtons";
import DeleteConfirm from "./delete/DeleteConfirm";

/**
 * ProfileContent component
 * Client component that manages the edit and delete state and renders the interactive parts
 * @param currentUser - The current user data
 * @param cards - The profile cards (server component) passed as children
 */
const ProfileContent = ({
  currentUser,
  cards,
}: {
  currentUser: CurrentUser;
  cards: React.ReactNode;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsDeleting(false);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
    setIsEditing(false);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete profile confirmed");
    setIsDeleting(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="space-y-4">
        {cards}
        <ProfileActionsButtons
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>

      <div className="space-y-6">
        <Activity mode={isEditing ? "visible" : "hidden"}>
          <EditProfile currentUser={currentUser} onClose={handleCloseEdit} />
        </Activity>
        <Activity mode={isDeleting ? "visible" : "hidden"}>
          <DeleteConfirm
            onClose={handleCloseDelete}
            onConfirm={handleConfirmDelete}
          />
        </Activity>
      </div>
    </div>
  );
};

export default ProfileContent;

