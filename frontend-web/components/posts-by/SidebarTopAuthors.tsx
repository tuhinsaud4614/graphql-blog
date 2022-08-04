import { ReactorModalItem } from "@component";
import { useLockBody } from "@hooks";
import FollowItem from "components/FollowItem";
import ReactorModal from "components/ReactorModal";
import { SidebarContent } from "components/Sidebar";
import { Fragment, useState } from "react";

const className = {
  more: "mt-5 text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

export default function SidebarTopAuthors() {
  return (
    <SidebarContent
      title="Top Authors"
      classes={{ items: "pb-4", title: "mt-8" }}
    >
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <FollowItem />
      <li>
        <SeeMore />
      </li>
    </SidebarContent>
  );
}

function SeeMore() {
  const [open, setOpen] = useState(false);
  useLockBody(open);
  return (
    <Fragment>
      <button
        type="button"
        aria-label="See more"
        className={className.more}
        onClick={() => setOpen(true)}
      >
        See more
      </button>
      <ReactorModal
        title="Top Authors"
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
