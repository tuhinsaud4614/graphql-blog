import * as React from "react";

import { NetworkStatus } from "@apollo/client";
import lodash_uniqBy from "lodash/uniqBy";

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
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

interface Props {
  authorId: string;
}

export default function SeeMoreFollow({ authorId }: Props) {
  const { data, error, loading, refetch, networkStatus, fetchMore } =
    useGetAuthorFollowersWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 6, authorId },
    });

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <React.Fragment>
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
      </React.Fragment>
    );
  }

  if (error) {
    return (
      <li>
        <ErrorBox
          title="Followings fetching  errors"
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
          No following found
        </NoResultFound>
      </li>
    );
  }

  const { hasNext, endCursor } = data.authorFollowersWithCursor.pageInfo;

  const onMore = async () => {
    try {
      await fetchMore({
        variables: {
          limit: 6,
          after: endCursor,
          authorId,
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
              edges: lodash_uniqBy(
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
    <React.Fragment>
      {data?.authorFollowersWithCursor.edges.map(({ node }) => (
        <ReactorModalItem key={node.id} user={node} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={onMore} />}
    </React.Fragment>
  );
}
