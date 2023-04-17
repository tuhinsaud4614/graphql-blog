import { ErrorBox, FollowItem, FollowItemSkeleton } from "@/components";
import { SidebarContent } from "@/components/Sidebar";
import { useGetSuggestAuthorsOnOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  skeleton: "flex flex-col space-y-4",
};

export default function Authors() {
  const { data, loading, refetch, error } = useGetSuggestAuthorsOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4, page: 1 },
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className={className.skeleton}>
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
            isDev() && console.log("Fetching authors errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.suggestAuthorsToUserOnOffset.data.length === 0) {
    return null;
  }

  return (
    <SidebarContent
      moreLink={ROUTES.mySuggestions}
      title="Who to follow"
      moreText={
        data.suggestAuthorsToUserOnOffset.pageInfo?.hasNext
          ? "See more suggestions"
          : undefined
      }
      classes={{ items: "pb-8 overflow-x-hidden" }}
    >
      {data.suggestAuthorsToUserOnOffset.data.map((user) => (
        <FollowItem key={user.id} user={user} />
      ))}
    </SidebarContent>
  );
}
