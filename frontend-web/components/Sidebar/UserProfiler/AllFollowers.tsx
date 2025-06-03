"use client";

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
import { useGetAuthorFollowersWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

interface Props {
  authorId: string;
}

export default function AllFollowers({ authorId }: Readonly<Props>) {
  const { data, fetchMore, refetch, error, networkStatus, loading } =
    useGetAuthorFollowersWithCursorQuery({
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
            } catch {}
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

  const pageInfo = data?.authorFollowersWithCursor?.pageInfo;

  const hasNext = pageInfo ? pageInfo.hasNext : false;
  const endCursor = pageInfo ? pageInfo.endCursor : null;

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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
    } catch {}
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
