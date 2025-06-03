import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";
import { Waypoint } from "react-waypoint";

import {
  ErrorBox,
  NotFoundMessage,
  PostItem,
  PostItemSkeleton,
  TabBox,
} from "@/components";
import { useGetPostsWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

export default function TabRecommended() {
  const { data, error, networkStatus, refetch, fetchMore } =
    useGetPostsWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 10 },
      errorPolicy: "all",
    });

  if (networkStatus === NetworkStatus.refetch) {
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
            title="Fetching recommended posts errors"
            errors={gplErrorHandler(error)}
            classes={{
              root: "mt-6",
            }}
            onRetry={async () => {
              try {
                await refetch();
              } catch (error) {
                isDev() &&
                  console.log("Fetching recommended posts errors", error);
              }
            }}
          />
        }
      />
    );
  }

  if (!data || data.postsWithCursor.edges.length === 0) {
    return (
      <TabBox
        notFound={
          <NotFoundMessage
            title="Recommended posts will appear here."
            goto={ROUTES.myHome}
            gotoText="Browse following posts"
          />
        }
      />
    );
  }

  const { hasNext, endCursor } = data.postsWithCursor.pageInfo;
  const { edges } = data.postsWithCursor;

  const fetchMoreHandler = async () => {
    try {
      await fetchMore({
        variables: {
          after: endCursor,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) {
            return prev;
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
      {hasNext && <Waypoint onEnter={fetchMoreHandler} />}
      {networkStatus === NetworkStatus.fetchMore && <PostItemSkeleton />}
    </TabBox>
  );
}
