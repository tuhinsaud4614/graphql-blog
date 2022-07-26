import { useLockBody } from "@hooks";
import { ReactorModal, ReactorModalItem } from "components";
import { Fragment, useState } from "react";
import FollowingItem from "./FollowingItem";

const className = {
  root: "flex flex-col",
  title: "text-base font-medium text-neutral",
  items: "list-none my-4 flex flex-col",
  more: "text-sm text-accent hover:text-neutral active:scale-95 self-start",
};

export default function FollowingList() {
  return (
    <div className={className.root}>
      <h3 className={className.title}>Following</h3>
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
        title="96 following"
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
