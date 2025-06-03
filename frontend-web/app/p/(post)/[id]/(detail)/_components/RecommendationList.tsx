"use client";

import { NetworkStatus } from "@apollo/client";

import { ErrorBox } from "@/components";
import { useGetPostsWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";

export default function RecommendationList() {
  const { data, error, refetch, networkStatus } = useGetPostsWithCursorQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: 1 },
    errorPolicy: "all",
  });

  if (
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.refetch
  ) {
    return (
      <ul className="mt-10 flex flex-wrap gap-4">
        <>
          <PostCardSkeleton className="flex-1" />
          <PostCardSkeleton className="flex-1" />
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
          root: "mt-10",
        }}
        onRetry={async () => {
          await refetch();
        }}
      />
    );
  }

  if (!data || data.postsWithCursor.edges.length === 0) {
    return null;
  }

  return (
    <ul className="mt-10 flex list-none flex-wrap gap-4">
      {data?.postsWithCursor.edges.map((post) => (
        <li key={post.node.id} className="basis-full md:basis-1/2">
          <PostCard post={post.node} />
        </li>
      ))}
    </ul>
  );
}
