import Modal from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import NewUserForm from "./NewUserForm";

const AddNewUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <UserPlus className="size-4 mr-2" />
        Add New User
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        disableClose={false}
      >
        <NewUserForm onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export default AddNewUser;
