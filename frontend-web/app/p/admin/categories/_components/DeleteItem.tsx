"use client";

import * as React from "react";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";
import {
  Category,
  useDeleteCategoryMutation,
} from "@/graphql/generated/schema";
import { deleteGetCategoriesWithOffsetQuery } from "@/lib/cache-utils";
import { gplErrorHandler } from "@/lib/utils";

interface Props {
  id: Category["id"];
  title: Category["title"];
}

export default function AdminCategoryDelete({ id, title }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeHandler = () => setIsOpen(false);

  const [deleteMutation, { loading }] = useDeleteCategoryMutation({
    errorPolicy: "all",
    onError(error) {
      const tempErrors = gplErrorHandler(error);
      if (tempErrors) {
        toast.error(<ToastErrorMessage error={tempErrors} />, {
          position: "bottom-right",
        });
      }
    },
    onCompleted() {
      toast.success(
        <>
          <b className="text-error">{title}</b> deleted successfully.
        </>,
        {
          position: "bottom-right",
        },
      );
      closeHandler();
    },
  });

  const deleteHandler = async () => {
    await deleteMutation({
      variables: { id },
      update(cache, { data }) {
        if (data?.deleteCategory) {
          deleteGetCategoriesWithOffsetQuery(cache, data.deleteCategory);
        }
      },
    });
  };

  return (
    <>
      <Button variant="error" onClick={() => setIsOpen(true)} circle>
        <Trash2 size={16} />
      </Button>
      <Modal
        open={isOpen}
        locked={isOpen}
        onHide={closeHandler}
        classes={{ container: "sm:max-w-md" }}
      >
        <ModalHeader onClose={closeHandler} className="border-none" />
        <div className="flex flex-col items-center justify-center p-4 !pt-0 md:p-6">
          <h2 className="font-title text-2xl font-medium text-primary selection:bg-primary selection:text-primary-foreground">
            Delete Category
          </h2>
          <p className="pb-4 pt-1.5 text-center text-sm text-neutral/60 selection:bg-secondary selection:text-secondary-foreground md:pb-6 md:text-base">
            Are you sure want to delete category{" "}
            <b className="text-neutral">{title}</b>
          </p>
          <div className="flex items-center">
            <Button
              aria-label="Cancel"
              type="button"
              onClick={closeHandler}
              className="mr-2 !px-4 !py-1.5 text-sm"
              variant="neutral"
              mode="outline"
            >
              Cancel
            </Button>
            <Button
              variant="error"
              aria-label="Delete"
              type="button"
              onClick={deleteHandler}
              className="!px-4 !py-1.5 text-sm"
              loading={loading}
              disabled={loading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
