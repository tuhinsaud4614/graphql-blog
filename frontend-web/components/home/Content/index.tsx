import { NetworkStatus } from "@apollo/client";
import {
  ErrorBox,
  NoResultFound,
  PostItem,
  PostItemSkeleton,
} from "components";
import { useGetPostsQuery } from "graphql/generated/schema";
import { Fragment, PropsWithChildren } from "react";
import { Waypoint } from "react-waypoint";
import { gplErrorHandler } from "utils";
import Sidebar from "./Sidebar";

const className = {
  root: "flex flex-col md1:flex-row-reverse sm:mx-auto max-w-5xl md1:pt-10 pb-4",
  items:
    "md1:basis-full px-4 list-none m-0 pt-10 md1:pt-3 pb-3 flex flex-col space-y-12",
};

export default function Content() {
  const { data, error, loading, refetch, networkStatus, fetchMore } =
    useGetPostsQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 1 },
    });

  if (networkStatus == NetworkStatus.refetch) {
    return (
      <Wrapper>
        <ul className={className.items}>
          <Fragment>
            <PostItemSkeleton />
            <PostItemSkeleton />
          </Fragment>
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

  if (!data || !data.posts.edges || data.posts.edges.length === 0) {
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

  const { hasNext, endCursor } = data.posts.pageInfo;
  const { edges } = data.posts;

  return (
    <Wrapper>
      <ul className={className.items}>
        {edges.map((edge) => (
          <Fragment key={edge.node.id}>
            <PostItem post={edge.node} />
            {hasNext && (
              <Waypoint
                onEnter={async () => {
                  await fetchMore({
                    variables: {
                      after: endCursor,
                    },
                    updateQuery(prev, { fetchMoreResult }) {
                      if (!fetchMoreResult) {
                        return prev;
                      }

                      return {
                        posts: {
                          ...fetchMoreResult.posts,
                          edges: [
                            ...prev.posts.edges,
                            ...fetchMoreResult.posts.edges,
                          ],
                        },
                      };
                    },
                  });
                }}
              />
            )}
          </Fragment>
        ))}
        {networkStatus === NetworkStatus.fetchMore && (
          <Fragment>
            <PostItemSkeleton />
          </Fragment>
        )}
      </ul>
    </Wrapper>
  );
}

function Wrapper({ children }: PropsWithChildren) {
  return (
    <section className={className.root}>
      <Sidebar />
      {children}
    </section>
  );
}
