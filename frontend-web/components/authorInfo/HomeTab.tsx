import { NoResultFound, PostItem, TabBox } from "components";
import { GetUserWithPostQuery } from "graphql/generated/schema";

const className = {
  item: "border-b last:border-none py-5 last:pb-0",
};

interface Props {
  posts?: GetUserWithPostQuery["user"]["posts"];
}

export default function HomeTab({ posts }: Props) {
  return (
    <TabBox
      notFound={
        (!posts || posts.length) === 0 && (
          <NoResultFound>
            The author haven&rsquo;t published any posts yet
          </NoResultFound>
        )
      }
    >
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          classes={{ root: className.item }}
        />
      ))}
    </TabBox>
  );
}
