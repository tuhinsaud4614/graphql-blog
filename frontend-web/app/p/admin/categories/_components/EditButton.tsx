"use client";

import * as React from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";
import { useUpdateCategoryMutation } from "@/graphql/generated/schema";
import { modifyGetCategoriesWithOffsetQuery } from "@/lib/cache-utils";
import { gplErrorHandler } from "@/lib/utils";

import AdminCategoryForm from "./Form";

interface Props {
  oldTitle: string;
  categoryId: string;
}

export default function AdminCategoryEdit({ categoryId, oldTitle }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [updateCategory, { loading }] = useUpdateCategoryMutation({
    notifyOnNetworkStatusChange: true,
    onError(error) {
      const tempErrors = gplErrorHandler(error);
      if (tempErrors) {
        toast.error(<ToastErrorMessage error={tempErrors} />, {
          position: "bottom-right",
        });
      }
    },
    onCompleted(data) {
      toast.success(
        <>
          <b className="capitalize">{data.updateCategory.title}</b> updated
          successfully.
        </>,
        {
          position: "bottom-right",
        },
      );
    },
  });

  const submitHandler = async (title: string) => {
    await updateCategory({
      variables: { title, id: categoryId },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        modifyGetCategoriesWithOffsetQuery({
          cache,
          category: data.updateCategory,
          mode: "UPDATE",
        });
      },
    });
    handleClose();
  };

  return (
    <>
      <Button
        type="button"
        variant="warning"
        onClick={handleOpen}
        disabled={isOpen}
        circle
      >
        <Pencil size={16} />
      </Button>
      <Modal
        open={isOpen}
        locked={isOpen}
        onHide={handleClose}
        classes={{ container: "sm:max-w-md" }}
      >
        <ModalHeader onClose={handleClose}>
          <h3 className="flex-1 text-center text-xl font-extrabold text-neutral">
            Edit Category
          </h3>
        </ModalHeader>
        <AdminCategoryForm
          loading={loading}
          submitBtnLabel="Update category"
          submitHandler={submitHandler}
          defaultValue={oldTitle}
        />
      </Modal>
    </>
  );
}
