import * as React from "react";

import { TabBox } from "@/components";

import PostItem from "./PostItem";

const className = {
  root: "!py-16 flex items-end justify-center",
  notFound: "text-neutral dark:border-base-dark-300",
  item: "border-b last:border-none py-5",
};

const isTrue = false;

export default function TabPublished() {
  return (
    <TabBox
      classes={{ root: className.root }}
      notFound={
        isTrue && (
          <React.Fragment>
            <p className={className.notFound}>
              You haven’t published any public stories yet.
            </p>
          </React.Fragment>
        )
      }
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
