"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import {
    ChartNetworkIcon,
    CogIcon,
    EllipsisVerticalIcon,
    PencilIcon,
    Trash2Icon,
} from "lucide-react";

import { usePostDetail } from "@/app/p/(post)/_context/post-detail-context";
import { Menu } from "@/components";
import useTooltip from "@/hooks/useTooltip";
import useUser from "@/hooks/useUser";

import DeletePost from "./DeletePost";

const className = {
  root: "p-1 outline-none border-none text-accent dark:text-accent-dark hover:bg-base-200 dark:hover:bg-base-dark-300 hover:text-accent-focus dark:hover:text-accent active:scale-95 rounded-full",
  items: "list-none m-0 flex flex-col min-w-[7.5rem]",
  btn: "w-full outline-none border-none flex items-center px-2 py-1.5 text-sm hover:bg-base-200 dark:hover:bg-base-dark-100  text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark active:scale-95",
  deleteBody: "flex items-center justify-center z-[1001]",
  deleteContent: "flex flex-col items-center justify-center p-[3.125rem]",
  deleteTitle:
    "font-medium text-neutral dark:text-neutral-dark text-[1.375rem] leading-7",
  deleteActions: "flex justify-center mx-auto",
  deleteInfo: "text-sm text-neutral dark:text-neutral-dark text-center",
};

export default function MoreOptions() {
  const author = usePostDetail((state) => state.post.author);
  const authUser = useUser();
  const [openModel, setOpenModel] = React.useState(false);
  const params = useParams<{ id: string }>();
  const postId = params?.id;
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const { onHoverEnd, onHoverStart } = useTooltip();
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  if (!authUser || authUser.id !== author.id) {
    return null;
  }

  return (
    <React.Fragment>
      <button
        type="button"
        aria-label="More"
        className={className.root}
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: "More",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-3 py-2",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
      >
        <EllipsisVerticalIcon size={20} />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <ul className={className.items}>
          <li>
            <button
              type="button"
              aria-label="Edit"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                opener();
              }}
            >
              <PencilIcon size={18} />
              <span className="ml-2">Edit post</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Delete"
              className="dark:hover:bg-base-dark-100 dark:text-neutral-dark dark:hover:text-accent-dark flex w-full items-center border-none px-2 py-1.5 text-sm  text-neutral outline-none hover:bg-base-200 hover:text-accent active:scale-95"
              onClick={() => {
                setAnchorEle(null);
                setOpenModel(true);
              }}
            >
              <Trash2Icon size={18} />
              <span className="ml-2">Delete post</span>
            </button>
          </li>
          <li className="my-2 border-t" />
          <li>
            <button
              type="button"
              aria-label="Settings"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                opener();
              }}
            >
              <CogIcon size={18} />
              <span className="ml-2">Post settings</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Stats"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                opener();
              }}
            >
              <ChartNetworkIcon size={18} />
              <span className="ml-2">Post stats</span>
            </button>
          </li>
        </ul>
      </Menu>
      <DeletePost
        openModel={openModel}
        setOpenModel={setOpenModel}
        postId={postId || ""}
      />
    </React.Fragment>
  );
}
