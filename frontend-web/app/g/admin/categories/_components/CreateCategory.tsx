"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";
import { useCreateCategoryMutation } from "@/graphql/generated/schema";
import { modifyGetCategoriesWithOffsetQuery } from "@/lib/cache-utils";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import AdminCategoryForm from "./Form";

export default function AdminCreateCategory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [createCategory, { loading }] = useCreateCategoryMutation({
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
          <b className="capitalize">{data.createCategory.title}</b> created
          successfully.
        </>,
        {
          position: "top-right",
        },
      );
    },
  });

  const submitHandler = async (title: string) => {
    try {
      await createCategory({
        variables: { title },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          modifyGetCategoriesWithOffsetQuery({
            cache,
            category: data.createCategory,
            mode: "ADD",
          });
        },
      });
      handleClose();
    } catch (error) {
      isDev() && console.log("Admin Category Creation @Error: ", error);
    }
  };
  return (
    <>
      <Button
        aria-label="Add Category"
        className="gap-2 capitalize"
        onClick={handleOpen}
        disabled={isOpen}
      >
        <Plus size={24} className="text-current" />
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
        <AdminCategoryForm
          loading={loading}
          submitBtnLabel="Save category"
          submitHandler={submitHandler}
        />
      </Modal>
    </>
  );
}
