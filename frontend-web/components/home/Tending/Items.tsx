import { NetworkStatus } from "@apollo/client";

import { ErrorBox, NoResultFound } from "@/components";
import { useGetTrendingPostsQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

import TrendingItem from "./Item";
import TrendingItemSkeleton from "./ItemSkeleton";

const className = {
  root: "list-none m-0 flex flex-wrap",
};

export default function TrendingItems() {
  const { data, error, loading, refetch, networkStatus } =
    useGetTrendingPostsQuery({
      notifyOnNetworkStatusChange: true,
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return (
      <ul className={className.root}>
        <TrendingItemSkeleton />
        <TrendingItemSkeleton />
        <TrendingItemSkeleton />
      </ul>
    );
  }

  if (error) {
    return (
      <ErrorBox
        title="Trends posts errors"
        errors={gplErrorHandler(error)}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {}
        }}
      />
    );
  }

  if (!data || !data.trendingPosts || data.trendingPosts.length === 0) {
    return (
      <NoResultFound classes={{ root: "!items-start", title: "text-lg" }}>
        No trending posts for you
      </NoResultFound>
    );
  }

  return (
    <ul className={className.root}>
      {data?.trendingPosts.map((post, index) => (
        <TrendingItem post={post} key={post.id} index={index + 1} />
      ))}
    </ul>
  );
}
