import { NotFoundMessage, TabBox } from "components";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

const isTrue = false;

export default function TabRecommended() {
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
      {/* {data?.followingAuthorPosts.edges.map((edge) => (
        <PostItem
          key={edge.node.id}
          post={edge.node}
          classes={{ root: className.item }}
        />
      ))} */}
    </TabBox>
  );
}
