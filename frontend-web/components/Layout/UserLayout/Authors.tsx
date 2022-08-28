import { ROUTES } from "@constants";
import { ErrorBox, FollowItem, FollowItemSkeleton } from "components";
import { SidebarContent } from "components/Sidebar";
import { useGetSuggestAuthorsOnOffsetQuery } from "graphql/generated/schema";
import { gplErrorHandler, isDev } from "utils";

const className = {
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  item: "text-sm first:mt-3 first:ml-3 !rounded-full",
  skeleton: "flex flex-col space-y-4",
};

export default function Authors() {
  const { data, loading, refetch, error } = useGetSuggestAuthorsOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4, page: 1 },
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
      classes={{ items: "pb-8" }}
    >
      {data.suggestAuthorsToUserOnOffset.data.map((user) => (
        <FollowItem key={user.id} user={user} />
      ))}
    </SidebarContent>
  );
}
