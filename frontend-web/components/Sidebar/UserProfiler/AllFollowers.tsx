import * as React from "react";

import { NetworkStatus } from "@apollo/client";
import _ from "lodash";

import {
  ErrorBox,
  NoResultFound,
  ReactorItemMoreBtn,
  ReactorItemSkeleton,
  ReactorModalItem,
} from "@/components";
import { useGetAuthorFollowersOnCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

interface Props {
  authorId: string;
}

export default function AllFollowers({ authorId }: Props) {
  const { data, fetchMore, refetch, error, networkStatus, loading } =
    useGetAuthorFollowersOnCursorQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
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

  if (!data || data.authorFollowersOnCursor.edges.length === 0) {
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

  const { hasNext, endCursor } = data?.authorFollowersOnCursor.pageInfo;

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
              authorFollowersOnCursor: {
                ...prev.authorFollowersOnCursor,
                pageInfo: {
                  ...prev.authorFollowersOnCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            authorFollowersOnCursor: {
              ...fetchMoreResult.authorFollowersOnCursor,
              edges: _.uniqBy(
                [
                  ...prev.authorFollowersOnCursor.edges,
                  ...fetchMoreResult.authorFollowersOnCursor.edges,
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
      {data?.authorFollowersOnCursor.edges.map(({ node }) => (
        <ReactorModalItem key={node.id} user={node} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={onMore} />}
    </React.Fragment>
  );
}
