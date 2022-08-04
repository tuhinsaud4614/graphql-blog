import { PostItem } from "components";
import { ReactNode } from "react";
import TabContainer from "./TabContainer";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

interface Props {
  link: string;
  linkText: string;
  children?: ReactNode;
}

export default function Posts({ link, linkText }: Props) {
  return (
    <TabContainer
      title="Posts for the search will appear here."
      link={link}
      linkText={linkText}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabContainer>
  );
}
