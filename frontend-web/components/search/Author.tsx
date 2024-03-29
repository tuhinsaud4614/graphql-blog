import * as React from "react";

import { FollowItem } from "@/components";

import TabContainer from "./TabContainer";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
  avatar: "md:!h-16 md:!w-16",
  mid: "md:!pl-6 md:!pr-12",
};

const isTrue = false;

interface Props {
  link: string;
  linkText: string;
  children?: React.ReactNode;
}

export default function Author({ link, linkText }: Props) {
  return (
    <TabContainer
      title="Author for the search will appear here."
      link={link}
      linkText={linkText}
    >
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <FollowItem
          key={index}
          classes={{
            root: className.item,
            avatar: className.avatar,
            mid: className.mid,
          }}
        />
      ))} */}
    </TabContainer>
  );
}
