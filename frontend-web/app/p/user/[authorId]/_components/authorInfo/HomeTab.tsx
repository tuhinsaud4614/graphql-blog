"use client";

import { NoResultFound, PostItem, TabBox } from "@/components";
import { GetUserWithPostQuery } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";


const className = {
  item: "border-b last:border-none py-5 last:pb-0",
};

interface Props {
  posts?: GetUserWithPostQuery["user"]["posts"];
}

export default function HomeTab({ posts }: Readonly<Props>) {
  const user = useUser();
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
      {posts?.map((post) => {
        return (
          <PostItem
            key={post.id}
            post={post}
            classes={{ root: className.item, body: "block" }}
            navigateLink={
              !post.content && user?.id && user.id === post.author.id
                ? ROUTES.user.editPost(post.id)
                : ROUTES.user.post(post.id)
            }
          />
        );
      })}
    </TabBox>
  );
}
