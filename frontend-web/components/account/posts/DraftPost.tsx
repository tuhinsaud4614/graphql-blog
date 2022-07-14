import classNames from "classnames";
import { Menu, Modal, ModalHeader } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { ROUTES } from "utils/constants";

const className = {
  root: "flex flex-col",
  title: "font-bold line-clamp-2 text-ellipsis text-neutral inline-block",
  body: "line-clamp-2 leading-5 text-ellipsis text-neutral/60 inline-block mt-1",
  other: "flex items-center pt-2 text-sm text-neutral/60",
  moreBtn: "ml-2 border-none outline-none active:scale-95 hover:text-accent",
  actions: "w-32 flex flex-col py-2",
  actionsBtn: "outline-none border-none px-5 py-2 text-sm active:scale-95",
  modalBody: "px-14 pb-11 flex flex-col justify-center items-center",
  modalBodyTitle:
    "font-medium text-[1.375rem] md:text-[1.875rem] leading-7 md:leading-9 text-neutral",
  modalBodyText: "pt-1.5 pb-9 text-sm md:text-base text-neutral/60 text-center",
  modalBodyBtn: "outline-none px-4 py-1.5 rounded-full active:scale-95 text-sm",
};

interface Props {
  classes?: {
    root?: string;
  };
}

export default function DraftPost({ classes }: Props) {
  const { push } = useRouter();
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const [openModel, setOpenModel] = useState(false);

  return (
    <Fragment>
      <li className={classNames(className.root, classes?.root)}>
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <section className={className.actions}>
          <button
            aria-label="Edit draft"
            type="button"
            className={classNames(
              className.actionsBtn,
              "text-neutral hover:text-neutral-focus"
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
            className={classNames(
              className.actionsBtn,
              "text-error hover:text-error-focus"
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
            <button
              aria-label="Cancel"
              type="button"
              className={classNames(
                className.modalBodyBtn,
                "border border-neutral text-neutral hover:text-neutral-focus mr-2"
              )}
              onClick={() => setOpenModel(false)}
            >
              Cancel
            </button>
            <button
              aria-label="Delete"
              type="button"
              className={classNames(
                className.modalBodyBtn,
                "border border-error hover:border-error-focus text-base-100 bg-error hover:bg-error-focus"
              )}
              onClick={() => {}}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
