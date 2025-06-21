import * as React from "react";

import { PlusCircleIcon } from "lucide-react";

import { Button, Modal, ModalHeader } from "@/components";

import CreateForm from "./CreateForm";

export default function CreateCategory() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        aria-label="Add Category"
        className="capitalize"
        onClick={handleClick}
        disabled={isOpen}
      >
        <PlusCircleIcon size={24} className="[&_path]:stroke-current" />
        add category
      </Button>
      <Modal
        open={isOpen}
        locked={isOpen}
        onHide={handleClose}
        classes={{ container: "sm:max-w-md" }}
      >
        <ModalHeader onClose={handleClose}>
          <h3 className="dark:text-neutral-dark flex-1 text-center text-xl font-extrabold text-neutral">
            Create Category
          </h3>
        </ModalHeader>
        <CreateForm onClose={handleClose} />
      </Modal>
    </>
  );
}
