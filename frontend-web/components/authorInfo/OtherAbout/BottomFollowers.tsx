import { Fragment } from "react";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";

import {
  ErrorBox,
  NoResultFound,
  ReactorItemMoreBtn,
  ReactorItemSkeleton,
  ReactorModalItem,
} from "@/components";
import { useGetAuthorFollowersWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

const className = {
  btn: "text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95",
  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
};

interface Props {
  userId: string;
}

export default function BottomFollowers({ userId }: Props) {
  const { data, fetchMore, refetch, error, networkStatus, loading } =
    useGetAuthorFollowersWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      variables: { limit: 6, authorId: userId },
    });

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <Fragment>
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
      </Fragment>
    );
  }

  if (error) {
    return (
      <li>
        <ErrorBox
          title="Followers fetching  errors"
          errors={gplErrorHandler(error)}
          onRetry={async () => {
            try {
              await refetch();
            } catch (error) {}
          }}
        />
      </li>
    );
  }

  if (!data || data.authorFollowersWithCursor.edges.length === 0) {
    return (
      <li>
        <NoResultFound
          classes={{
            root: "mx-4 !py-0",
            title: "text-lg",
          }}
        >
          No followers found
        </NoResultFound>
      </li>
    );
  }

  const { hasNext, endCursor } = data?.authorFollowersWithCursor.pageInfo;

  const onMore = async () => {
    try {
      await fetchMore({
        variables: {
          limit: 6,
          after: endCursor,
          authorId: userId,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) {
            return {
              ...prev,
              authorFollowersWithCursor: {
                ...prev.authorFollowersWithCursor,
                pageInfo: {
                  ...prev.authorFollowersWithCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            authorFollowersWithCursor: {
              ...fetchMoreResult.authorFollowersWithCursor,
              edges: _uniqBy(
                [
                  ...prev.authorFollowersWithCursor.edges,
                  ...fetchMoreResult.authorFollowersWithCursor.edges,
                ],
                "cursor",
              ),
            },
          };
        },
      });
    } catch (error) {}
  };
  return (
    <Fragment>
      {data?.authorFollowersWithCursor.edges.map(({ node }) => (
        <ReactorModalItem key={node.id} user={node} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={onMore} />}
    </Fragment>
  );
}
