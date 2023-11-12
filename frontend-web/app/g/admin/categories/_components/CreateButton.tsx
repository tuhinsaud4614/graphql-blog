"use client";

import * as React from "react";

import { Plus } from "lucide-react";

import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";

import AdminCategoryCreationForm from "./Form";

export default function AdminCategoryCreateButton() {
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
        <Plus size={24} className="[&_path]:stroke-current" />
        Add Category
      </Button>
      <Modal
        open={isOpen}
        locked={isOpen}
        onHide={handleClose}
        classes={{ container: "sm:max-w-md" }}
      >
        <ModalHeader onClose={handleClose}>
          <h3 className="flex-1 text-center text-xl font-extrabold text-neutral">
            Create Category
          </h3>
        </ModalHeader>
        <AdminCategoryCreationForm onClose={handleClose} />
      </Modal>
    </>
  );
}
