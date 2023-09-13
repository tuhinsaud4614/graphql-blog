import * as React from "react";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";

import {
  ErrorBox,
  NoResultFound,
  ReactorItemMoreBtn,
  ReactorItemSkeleton,
  ReactorModalItem,
} from "@/components";
import { useGetAuthorFollowingsWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

const className = {
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

interface Props {
  authorId: string;
}

export default function SeeMoreFollow({ authorId }: Props) {
  const { data, error, loading, refetch, networkStatus, fetchMore } =
    useGetAuthorFollowingsWithCursorQuery({
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

  if (!data || data.authorFollowingsWithCursor.edges.length === 0) {
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

  const { hasNext, endCursor } = data.authorFollowingsWithCursor.pageInfo;

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
              authorFollowingsWithCursor: {
                ...prev.authorFollowingsWithCursor,
                pageInfo: {
                  ...prev.authorFollowingsWithCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            authorFollowingsWithCursor: {
              ...fetchMoreResult.authorFollowingsWithCursor,
              edges: _uniqBy(
                [
                  ...prev.authorFollowingsWithCursor.edges,
                  ...fetchMoreResult.authorFollowingsWithCursor.edges,
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
      {data.authorFollowingsWithCursor.edges.map(({ node }) => (
        <ReactorModalItem key={node.id} user={node} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={onMore} />}
    </React.Fragment>
  );
}
