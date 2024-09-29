"use client";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";
import { Waypoint } from "react-waypoint";

import ErrorBox from "@/components/ErrorBox";
import NoResultFound from "@/components/NoResultFound";
import PostItemSkeleton from "@/components/post/Skeleton";
import PostItem from "@/components/post/item";
import { useGetPostsWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

export default function LandingContentPosts() {
  const { data, error, refetch, networkStatus, fetchMore } =
    useGetPostsWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 1 },
      errorPolicy: "all",
    });

  if (networkStatus === NetworkStatus.refetch) {
    return (
      <ul className="m-0 flex list-none flex-col space-y-12 px-4 pb-3 pt-10 md1:basis-full md1:pt-3">
        <>
          <PostItemSkeleton />
          <PostItemSkeleton />
        </>
      </ul>
    );
  }
  if (error) {
    return (
      <ErrorBox
        title="Fetching posts errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "md1:basis-full h-min mx-4 mt-10 md1:mt-3 mb-3",
        }}
        onRetry={async () => {
          await refetch();
        }}
      />
    );
  }

  if (!data || data.postsWithCursor.edges.length === 0) {
    return (
      <NoResultFound
        classes={{
          root: "!items-start md1:basis-full mx-4",
          title: "text-lg selection:bg-neutral selection:text-base-100",
        }}
      >
        No posts found for you
      </NoResultFound>
    );
  }

  const { hasNext, endCursor } = data.postsWithCursor.pageInfo;
  const { edges } = data.postsWithCursor;

  const fetchMoreHandler = async () => {
    await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          return {
            ...prev,
            postsWithCursor: {
              ...prev.postsWithCursor,
              pageInfo: { ...prev.postsWithCursor.pageInfo, hasNext: false },
            },
          };
        }
        return {
          postsWithCursor: {
            ...fetchMoreResult.postsWithCursor,
            edges: _uniqBy(
              [
                ...prev.postsWithCursor.edges,
                ...fetchMoreResult.postsWithCursor.edges,
              ],
              "cursor",
            ),
          },
        };
      },
    });
  };

  return (
    <ul className="m-0 flex list-none flex-col space-y-12 px-4 pb-3 pt-10 md1:basis-full md1:pt-3">
      {edges.map(({ node }) => (
        <PostItem key={node.id} post={node} />
      ))}
      {hasNext && <Waypoint onEnter={fetchMoreHandler} />}
      {networkStatus === NetworkStatus.fetchMore && <PostItemSkeleton />}
    </ul>
  );
}
