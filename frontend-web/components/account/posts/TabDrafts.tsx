import TabBox from "components/TabBox";
import { Fragment } from "react";
import DraftPost from "./DraftPost";

const className = {
  root: "!py-16 flex items-end justify-center",
  notFound: "text-neutral",
  item: "border-b last:border-none py-5",
};

const isTrue = false;

export default function TabDrafts() {
  return (
    <TabBox
      classes={{ root: className.root }}
      notFound={
        isTrue && (
          <Fragment>
            <p className={className.notFound}>You have no drafts.</p>
          </Fragment>
        )
      }
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <DraftPost key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
