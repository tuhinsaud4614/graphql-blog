import { PostItem, TabBox } from "components";
import { GetUserWithPostQuery } from "graphql/generated/schema";

const className = {
  item: "border-b last:border-none py-5 last:pb-0",
  notFoundRoot: "py-[1.875rem] flex flex-col items-center",
  notFoundTitle:
    "text-neutral dark:text-neutral-dark text-sm font-normal text-center mb-6",
};

interface Props {
  posts?: GetUserWithPostQuery["user"]["posts"];
}

export default function HomeTab({ posts }: Props) {
  return (
    <TabBox
      notFound={
        (!posts || posts.length) === 0 && (
          <div className={className.notFoundRoot}>
            <p className={className.notFoundTitle}>
              The author haven&rsquo;t published any posts yet
            </p>
          </div>
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
