import { PostItem } from "components";
import NotFoundMessage from "./NotFoundMessage";
import TabBox from "./TabBox";

const className = {
  item: "border-b last:border-none py-5 last:pb-0",
};

const isTrue = true;

export default function TabFollowing() {
  return (
    <TabBox
      notFound={
        isTrue && (
          <NotFoundMessage
            title="Posts from the authors you follow will appear here."
            goto="/my-home"
            gotoText="Browse recommended posts"
          />
        )
      }
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </TabBox>
  );
}
