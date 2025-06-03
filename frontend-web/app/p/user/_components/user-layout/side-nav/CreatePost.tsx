"use client";

import React from "react";

import { FileEditIcon } from "lucide-react";

import { Button, Modal, ModalHeader } from "@/components";
import CreatePostTitle from "@/components/post-create/CreatePostTitle";

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const closeHandler = () => setOpen(false);
  return (
    <>
      <Button
        variant="secondary"
        className="flex w-full items-center justify-center text-neutral hover:bg-transparent hover:text-secondary dark:text-neutral dark:hover:bg-transparent dark:hover:text-secondary"
        aria-label="Create Post"
        mode="text"
        onClick={() => setOpen(true)}
        type="button"
      >
        <FileEditIcon size={24} />
      </Button>
      <Modal open={open} locked={true} classes={{ container: "sm:max-w-md" }}>
        <ModalHeader onClose={closeHandler} className="border-none pb-0" />
        <div className="flex flex-col items-center justify-center p-4 !pt-0 md:p-6">
          <h2 className="font-title text-2xl font-medium text-primary selection:bg-primary selection:text-primary-foreground">
            Create a new post?
          </h2>
          <p className="pb-4 pt-1.5 text-center text-sm text-neutral/60 selection:bg-secondary selection:text-secondary-foreground md:pb-6 md:text-base">
            This will create a new untitled draft in your posts. You can edit
            and publish it later.
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
            <CreatePostTitle>
              <Button
                variant="accent"
                aria-label="Create a post"
                type="button"
                className="!px-4 !py-1.5 text-sm"
              >
                Yes, create post
              </Button>
            </CreatePostTitle>
          </div>
        </div>
      </Modal>
    </>
  );
}
