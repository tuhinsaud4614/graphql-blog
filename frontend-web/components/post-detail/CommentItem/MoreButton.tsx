import classNames from "classnames";
import { BottomSheet, Button, Menu } from "components";
import { Fragment, useState } from "react";
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useEditorOpener } from "./context";

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

export default function MoreButton() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const opener = useEditorOpener();
  return (
    <Fragment>
      <button
        type="button"
        aria-label="More"
        className={className.root}
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
      >
        <FiMoreVertical size={20} />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        hideArrow
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
              <FiEdit2 size={18} />
              <span className="ml-2">Edit</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label="Delete"
              className={className.btn}
              onClick={() => {
                setAnchorEle(null);
                setConfirmDelete(true);
              }}
            >
              <FiTrash2 size={18} />
              <span className="ml-2">Delete</span>
            </button>
          </li>
        </ul>
      </Menu>
      <BottomSheet
        open={confirmDelete}
        classes={{
          container: className.deleteBody,
          backdrop: "z-[1000] !opacity-0",
        }}
      >
        <div className={className.deleteContent}>
          <h2 className={className.deleteTitle}>Delete</h2>
          <p className={classNames(className.deleteInfo, "mt-2.5")}>
            Deleted responses are gone forever.
          </p>
          <p className={classNames(className.deleteInfo, "mb-10")}>
            Are you sure?
          </p>
          <div className={className.deleteActions}>
            <Button
              type="button"
              aria-label="Cancel"
              variant="neutral"
              mode="text"
              className="!rounded-full text-sm mr-2 !px-4 !py-2"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              aria-label="Delete Comment"
              variant="error"
              className="text-sm !px-4 !py-2"
              onClick={() => setConfirmDelete(false)}
            >
              Delete Comment
            </Button>
          </div>
        </div>
      </BottomSheet>
    </Fragment>
  );
}
