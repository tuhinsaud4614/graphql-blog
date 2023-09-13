import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { BiChevronDown } from "react-icons/bi";

import { Button, Menu, Modal, ModalHeader } from "@/components";
import { cn } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  root: "flex flex-col",
  title:
    "font-bold line-clamp-2 text-ellipsis text-neutral dark:text-neutral-dark inline-block",
  body: "line-clamp-2 leading-5 text-ellipsis text-neutral/50 dark:text-neutral-dark/50 inline-block mt-1",
  other:
    "flex items-center pt-2 text-sm text-neutral/70 dark:text-neutral-dark/70",
  moreBtn: "ml-2 border-none outline-none active:scale-95 hover:text-accent",
  actions: "w-32 flex flex-col py-2",
  actionsBtn: "outline-none border-none px-5 py-2 text-sm active:scale-95",
  modalBody: "px-14 pb-11 flex flex-col justify-center items-center",
  modalBodyTitle:
    "font-medium text-[1.375rem] md:text-[1.875rem] leading-7 md:leading-9 text-neutral dark:text-neutral-dark",
  modalBodyText:
    "pt-1.5 pb-9 text-sm md:text-base text-neutral/60 dark:text-neutral-dark/60 text-center",
};

interface Props {
  classes?: {
    root?: string;
  };
}

export default function PostItem({ classes }: Props) {
  const { push } = useRouter();
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const [openModel, setOpenModel] = React.useState(false);

  return (
    <React.Fragment>
      <li className={cn(className.root, classes?.root)}>
        <Link href={ROUTES.editPost("1")} passHref>
          <a aria-label="New post" className={className.title}>
            New Post
          </a>
        </Link>
        <Link href={ROUTES.editPost("1")} passHref>
          <a aria-label="Post body" className={className.body}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
            similique vero assumenda sit earum nulla. Debitis, illum? Corrupt
            Corrupt CorruptCorrupt CorruptCorruptCorruptCorruptCorruptCorrupt
            CorruptCorrupt Corrupt
          </a>
        </Link>
        <div className={className.other}>
          Last edited <span className="px-1.5">·</span> <time>Jun 11</time>
          <button
            type="button"
            aria-label="More action"
            className={className.moreBtn}
            onClick={(e) => {
              setAnchorEle(e.currentTarget);
            }}
          >
            <BiChevronDown size={21} />
          </button>
        </div>
      </li>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <section className={className.actions}>
          <button
            aria-label="Edit draft"
            type="button"
            className={cn(
              className.actionsBtn,
              "text-neutral hover:text-neutral-focus dark:text-neutral-dark dark:hover:text-neutral-dark-focus",
            )}
            onClick={() => {
              push(ROUTES.editPost("1"));
            }}
          >
            Edit draft
          </button>
          <button
            aria-label="Delete draft"
            type="button"
            className={cn(
              className.actionsBtn,
              "text-error hover:text-error-focus dark:text-error-dark dark:hover:text-error",
            )}
            onClick={() => {
              setAnchorEle(null);
              setOpenModel(true);
            }}
          >
            Delete draft
          </button>
        </section>
      </Menu>
      <Modal
        open={openModel}
        onHide={() => {
          setOpenModel(false);
        }}
      >
        <ModalHeader
          onClose={() => setOpenModel(false)}
          className="border-none"
        />
        <div className={className.modalBody}>
          <h2 className={className.modalBodyTitle}>Delete post</h2>
          <p className={className.modalBodyText}>
            Are you sure you want to delete this story?
          </p>
          <div className="flex items-center">
            <Button
              aria-label="Cancel"
              type="button"
              onClick={() => setOpenModel(false)}
              className="mr-2 !px-4 !py-1.5 text-sm"
              variant="neutral"
              mode="outline"
            >
              Cancel
            </Button>
            <Button
              aria-label="Delete"
              type="button"
              onClick={() => {}}
              className="!px-4 !py-1.5 text-sm"
              variant="error"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
