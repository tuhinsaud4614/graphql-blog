import * as React from "react";

import { TabBox } from "@/components";

import PostItem from "./PostItem";

const className = {
  root: "!py-16 flex items-end justify-center",
  notFound: "text-neutral dark:text-neutral-dark",
  item: "border-b dark:border-base-dark-300 last:border-none py-5",
};

const isTrue = false;

export default function TabDrafts() {
  return (
    <TabBox
      classes={{ root: className.root }}
      notFound={
        isTrue && (
          <React.Fragment>
            <p className={className.notFound}>You have no drafts.</p>
          </React.Fragment>
        )
      }
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
