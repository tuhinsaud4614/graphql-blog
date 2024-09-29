"use client";

import ErrorBox from "@/components/ErrorBox";
import FollowItem from "@/components/follow-item";
import FollowItemSkeleton from "@/components/follow-item/Skeleton";
import { useRecommendAuthorsWithOffsetQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import SidebarContent from "./Content";

export default function SidebarAuthors() {
  const { data, loading, refetch, error } = useRecommendAuthorsWithOffsetQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4, page: 1 },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="flex flex-col space-y-4">
        <FollowItemSkeleton />
        <FollowItemSkeleton />
        <FollowItemSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching authors errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
          title: "text-base",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.error("Fetching authors errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.recommendAuthorsWithOffset.data.length === 0) {
    return null;
  }

  return (
    <SidebarContent
      moreLink={ROUTES.user.suggestions}
      title="Who to follow"
      moreText={
        data.recommendAuthorsWithOffset.pageInfo?.hasNext
          ? "See more suggestions"
          : undefined
      }
      classes={{ items: "pb-8 overflow-x-hidden" }}
    >
      {data.recommendAuthorsWithOffset.data.map((user) => (
        <FollowItem key={user.id} user={user} />
      ))}
    </SidebarContent>
  );
}
