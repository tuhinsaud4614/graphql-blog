import { useLockBody } from "@hooks";
import { ReactorModal, ReactorModalItem } from "components";
import { Fragment, useState } from "react";
import FollowingItem from "./FollowingItem";

const className = {
  root: "flex flex-col mt-10 mb-8",
  title: "text-base font-medium text-neutral dark:text-neutral-dark",
  items: "list-none my-4 flex flex-col space-y-1",
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

export default function FollowerList() {
  return (
    <div className={className.root}>
      <h3 className={className.title}>Followers</h3>
      <ul className={className.items}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FollowingItem key={index} />
        ))}
      </ul>
      <SeeAll />
    </div>
  );
}

function SeeAll() {
  const [open, setOpen] = useState(false);
  useLockBody(open);
  return (
    <Fragment>
      <button
        type="button"
        aria-label="See all"
        className={className.more}
        onClick={() => setOpen(true)}
      >
        See all (96)
      </button>
      <ReactorModal
        title="96 followers"
        open={open}
        onHide={() => setOpen(false)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
    </Fragment>
  );
}
