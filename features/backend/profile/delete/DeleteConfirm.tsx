"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IconButton from "@/components/shared/IconButton";
import { X } from "lucide-react";

/**
 * DeleteConfirm component
 * Displays a confirmation dialog for deleting the profile
 * @param onClose - Callback function to close the delete confirmation
 * @param onConfirm - Callback function to confirm deletion
 */
const DeleteConfirm = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const handleConfirm = () => {
    // TODO: Implement delete functionality
    console.log("Delete confirmed");
    onConfirm();
  };

  return (
    <div className="space-y-6">
      <Card className="h-fit border-destructive/50">
        <CardHeader className="relative">
          <IconButton
            type="button"
            variant="ghost"
            icon={X}
            label="Close delete confirmation"
            className="absolute right-4 -top-2 h-6 w-6 [&>span]:hidden"
            onClick={onClose}
          />
          <CardTitle className="text-lg">Delete Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-base text-muted-foreground">
              Are you sure?
            </p>
            <div className="flex justify-center gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Exit
              </Button>
              <Button type="button" variant="destructive" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteConfirm;

