import { NetworkStatus } from "@apollo/client";
import {
  ErrorBox,
  NoResultFound,
  ReactorItemMoreBtn,
  ReactorItemSkeleton,
  ReactorModalItem,
} from "components";
import { useGetAuthorFollowingsOnCursorQuery } from "graphql/generated/schema";
import _ from "lodash";
import { Fragment } from "react";
import { gplErrorHandler } from "utils";

const className = {
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

interface Props {
  authorId: string;
}

export default function SeeMoreFollow({ authorId }: Props) {
  const { data, error, loading, refetch, networkStatus, fetchMore } =
    useGetAuthorFollowingsOnCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 6, authorId },
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

  if (!data || data.authorFollowingsOnCursor.edges.length === 0) {
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

  const { hasNext, endCursor } = data?.authorFollowingsOnCursor.pageInfo;

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
              authorFollowingsOnCursor: {
                ...prev.authorFollowingsOnCursor,
                pageInfo: {
                  ...prev.authorFollowingsOnCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            authorFollowingsOnCursor: {
              ...fetchMoreResult.authorFollowingsOnCursor,
              edges: _.uniqBy(
                [
                  ...prev.authorFollowingsOnCursor.edges,
                  ...fetchMoreResult.authorFollowingsOnCursor.edges,
                ],
                "cursor"
              ),
            },
          };
        },
      });
    } catch (error) {}
  };

  return (
    <Fragment>
      {data?.authorFollowingsOnCursor.edges.map(({ node }) => (
        <ReactorModalItem key={node.id} user={node} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={onMore} />}
    </Fragment>
  );
}
