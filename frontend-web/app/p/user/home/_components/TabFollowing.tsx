"use client";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";
import { Waypoint } from "react-waypoint";

import {
  ErrorBox,
  NotFoundMessage,
  PostItemSkeleton,
  TabBox,
} from "@/components";
import PostItem from "@/components/post/item";
import { useGetFollowingAuthorPostsQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

export default function TabFollowing() {
  const { data, error, networkStatus, refetch, fetchMore } =
    useGetFollowingAuthorPostsQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 10 },
      errorPolicy: "all",
    });

  if (
    networkStatus === NetworkStatus.refetch ||
    networkStatus === NetworkStatus.loading
  ) {
    return (
      <TabBox classes={{ items: "space-y-6" }}>
        <PostItemSkeleton />
        <PostItemSkeleton />
      </TabBox>
    );
  }
  if (error) {
    return (
      <TabBox
        notFound={
          <ErrorBox
            title="Fetching posts from the authors you follow errors"
            errors={gplErrorHandler(error)}
            classes={{
              root: "mt-6",
            }}
            onRetry={async () => {
              try {
                await refetch();
              } catch (error) {
                isDev() &&
                  console.log(
                    "Fetching posts from the authors you follow errors",
                    error,
                  );
              }
            }}
          />
        }
      />
    );
  }
  if (!data || data.followingAuthorPosts.edges.length === 0) {
    return (
      <TabBox
        notFound={
          <NotFoundMessage
            title="Posts from the authors you follow will appear here."
            goto={ROUTES.user.home}
            gotoText="Browse recommended posts"
          />
        }
      />
    );
  }

  const { hasNext, endCursor } = data.followingAuthorPosts.pageInfo;
  const { edges } = data.followingAuthorPosts;

  const fetchMoreHandler = async () => {
    try {
      await fetchMore({
        variables: {
          after: endCursor,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
              ...prev,
              followingAuthorPosts: {
                ...prev.followingAuthorPosts,
                pageInfo: {
                  ...prev.followingAuthorPosts.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            followingAuthorPosts: {
              ...fetchMoreResult.followingAuthorPosts,
              edges: _uniqBy(
                [
                  ...prev.followingAuthorPosts.edges,
                  ...fetchMoreResult.followingAuthorPosts.edges,
                ],
                "cursor",
              ),
            },
          };
        },
      });
    } catch (error) {
      isDev() && console.log(error);
    }
  };
  return (
    <TabBox>
      {edges.map(({ node }) => (
        <PostItem
          key={node.id}
          post={node}
          classes={{ root: className.item }}
        />
      ))}
      {hasNext && endCursor && <Waypoint onEnter={fetchMoreHandler} />}
      {networkStatus === NetworkStatus.fetchMore && <PostItemSkeleton />}
    </TabBox>
  );
}
