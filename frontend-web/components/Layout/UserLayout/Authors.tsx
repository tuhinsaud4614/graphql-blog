import {
  ErrorBox,
  FollowItem,
  FollowItemSkeleton,
  NoResultFound,
} from "components";
import { SidebarContent } from "components/Sidebar";
import { useGetUsersOnOffsetQuery } from "graphql/generated/schema";
import { gplErrorHandler, isDev } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  item: "text-sm first:mt-3 first:ml-3 !rounded-full",
  skeleton: "flex flex-col space-y-4",
};

export default function Authors() {
  const { data, loading, refetch, error } = useGetUsersOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 4, page: 1 },
  });

  console.log(data);

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

  if (!data || data.usersOnOffset.data.length === 0) {
    return <NoResultFound>No author found for you</NoResultFound>;
  }

  return (
    <SidebarContent
      moreLink={ROUTES.mySuggestions}
      title="Who to follow"
      moreText={
        data.usersOnOffset.pageInfo?.hasNext
          ? "See more suggestions"
          : undefined
      }
      classes={{ items: "pb-8" }}
    >
      {data.usersOnOffset.data.map((user) => (
        <FollowItem key={user.id} user={user} />
      ))}
    </SidebarContent>
  );
}
