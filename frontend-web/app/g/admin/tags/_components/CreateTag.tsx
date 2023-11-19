"use client";

import * as React from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";
import { useCreateTagMutation } from "@/graphql/generated/schema";
import { modifyGetTagWithOffsetQuery } from "@/lib/cache-utils";
import { gplErrorHandler } from "@/lib/utils";

import AdminTagForm from "./Form";

export default function AdminCreateTag() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [createTag, { loading }] = useCreateTagMutation({
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
          <b className="capitalize">{data.createTag.title}</b> created
          successfully.
        </>,
        {
          position: "bottom-right",
        },
      );
    },
  });

  const submitHandler = async (title: string) => {
    await createTag({
      variables: { title },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        modifyGetTagWithOffsetQuery({
          cache,
          tag: data.createTag,
          mode: "ADD",
        });
      },
    });
    handleClose();
  };
  return (
    <>
      <Button
        aria-label="Add Tag"
        className="gap-2 capitalize"
        onClick={handleOpen}
        disabled={isOpen}
      >
        <Plus size={24} className="text-current" />
        Add Tag
      </Button>
      <Modal
        open={isOpen}
        locked={isOpen}
        onHide={handleClose}
        classes={{ container: "sm:max-w-md" }}
      >
        <ModalHeader onClose={handleClose}>
          <h3 className="flex-1 text-center text-xl font-extrabold text-neutral">
            Create Tag
          </h3>
        </ModalHeader>
        <AdminTagForm
          loading={loading}
          submitBtnLabel="Save tag"
          submitHandler={submitHandler}
        />
      </Modal>
    </>
  );
}
