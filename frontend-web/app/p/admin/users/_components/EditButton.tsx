"use client";

import * as React from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Modal from "@/components/modal";
import ModalHeader from "@/components/modal/Header";
import Button from "@/components/ui/Button";
import { User, useUpdateTagMutation } from "@/graphql/generated/schema";
import { modifyGetTagWithOffsetQuery } from "@/lib/cache-utils";
import { gplErrorHandler } from "@/lib/utils";

import AdminTagForm from "./Form";

interface Props {
  username: User["name"];
  userId: User["id"];
}

export default function AdminUserEdit({ userId, username }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [updateCategory, { loading }] = useUpdateTagMutation({
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
          <b className="capitalize">{data.updateTag.title}</b> updated
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
      variables: { title, id: userId },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        modifyGetTagWithOffsetQuery({
          cache,
          tag: data.updateTag,
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
            Edit Tag
          </h3>
        </ModalHeader>
        <AdminTagForm
          loading={loading}
          submitBtnLabel="Update tag"
          submitHandler={submitHandler}
          defaultValue={username || ""}
        />
      </Modal>
    </>
  );
}
