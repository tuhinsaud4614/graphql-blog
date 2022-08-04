import TabBox from "components/TabBox";
import { Fragment } from "react";
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
          <Fragment>
            <p className={className.notFound}>
              You haven’t published any public stories yet.
            </p>
          </Fragment>
        )
      }
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
