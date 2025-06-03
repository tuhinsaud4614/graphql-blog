import * as React from "react";

import { PostItem } from "@/components";

import TabContainer from "./TabContainer";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

interface Props {
  link: string;
  linkText: string;
  children?: React.ReactNode;
}

export default function Posts({ link, linkText }: Props) {
  return (
    <TabContainer
      title="Posts for the search will appear here."
      link={link}
      linkText={linkText}
    >
      {/* {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))} */}
    </TabContainer>
  );
}
