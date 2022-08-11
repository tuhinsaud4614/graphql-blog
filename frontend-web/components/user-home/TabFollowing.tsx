import { NetworkStatus } from "@apollo/client";
import {
  ErrorBox,
  NotFoundMessage,
  PostItem,
  PostItemSkeleton,
  TabBox,
} from "components";
import { useGetFollowingAuthorPostsQuery } from "graphql/generated/schema";
import _ from "lodash";
import { Waypoint } from "react-waypoint";
import { gplErrorHandler } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
};

export default function TabFollowing() {
  const { data, error, networkStatus, refetch, fetchMore } =
    useGetFollowingAuthorPostsQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 1 },
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
            title="Fetching posts errors"
            errors={gplErrorHandler(error)}
            classes={{
              root: "mt-6",
            }}
            onRetry={async () => {
              try {
                await refetch();
              } catch (error) {}
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
          (!data || data.followingAuthorPosts.edges.length === 0) && (
            <NotFoundMessage
              title="Posts from the authors you follow will appear here."
              goto={ROUTES.myHome}
              gotoText="Browse recommended posts"
            />
          )
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
              edges: _.uniqBy(
                [
                  ...prev.followingAuthorPosts.edges,
                  ...fetchMoreResult.followingAuthorPosts.edges,
                ],
                "cursor"
              ),
            },
          };
        },
      });
    } catch (error) {
      console.log(error);
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
