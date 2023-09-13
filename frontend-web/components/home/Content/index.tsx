import * as React from "react";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";
import { Waypoint } from "react-waypoint";

import {
  ErrorBox,
  NoResultFound,
  PostItem,
  PostItemSkeleton,
} from "@/components";
import { useGetPostsWithCursorQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

import Sidebar from "./Sidebar";

const className = {
  root: "flex flex-col md1:flex-row-reverse sm:mx-auto max-w-5xl md1:pt-10 pb-4",
  items:
    "md1:basis-full px-4 list-none m-0 pt-10 md1:pt-3 pb-3 flex flex-col space-y-12",
};

export default function Content() {
  const { data, error, refetch, networkStatus, fetchMore } =
    useGetPostsWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 1 },
      errorPolicy: "all",
    });

  if (networkStatus === NetworkStatus.refetch) {
    return (
      <Wrapper>
        <ul className={className.items}>
          <React.Fragment>
            <PostItemSkeleton />
            <PostItemSkeleton />
          </React.Fragment>
        </ul>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <ErrorBox
          title="Fetching posts errors"
          errors={gplErrorHandler(error)}
          classes={{
            root: "md1:basis-full h-min mx-4 mt-10 md1:mt-3 mb-3",
          }}
          onRetry={async () => {
            try {
              await refetch();
            } catch (error) {}
          }}
        />
      </Wrapper>
    );
  }

  if (!data || data.postsWithCursor.edges.length === 0) {
    return (
      <Wrapper>
        <NoResultFound
          classes={{
            root: "!items-start md1:basis-full mx-4",
            title: "text-lg",
          }}
        >
          No posts found for you
        </NoResultFound>
      </Wrapper>
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
            return {
              ...prev,
              postsWithCursor: {
                ...prev.postsWithCursor,
                pageInfo: { ...prev.postsWithCursor.pageInfo, hasNext: false },
              },
            };
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
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ul className={className.items}>
        {edges.map(({ node }) => (
          <PostItem key={node.id} post={node} />
        ))}
        {hasNext && <Waypoint onEnter={fetchMoreHandler} />}
        {networkStatus === NetworkStatus.fetchMore && <PostItemSkeleton />}
      </ul>
    </Wrapper>
  );
}

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <section className={className.root}>
      <Sidebar />
      {children}
    </section>
  );
}
