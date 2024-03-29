import { useRouter } from "next/router";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";

import {
  ReactorItemMoreBtn,
  ReactorItemSkeleton,
  ReactorModal,
  ReactorModalItem,
} from "@/components";
import { useGetPostReactedByQuery } from "@/graphql/generated/schema";
import { useLockBody } from "@/hooks";
import { countConvert, gplErrorHandler, isDev } from "@/utils";

const className = {
  errorItem: "text-warning dark:text-warning-dark text-sm",
  noText: "text-info dark:text-info-dark text-sm",
};

interface Props {
  open: boolean;
  onClose(): void;
}

export default function FloatingLikes({ onClose, open }: Props) {
  const {
    query: { postId },
  } = useRouter();
  const { data, loading, error, networkStatus, fetchMore } =
    useGetPostReactedByQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      variables: { id: postId as string, limit: 6 },
    });

  const errors = gplErrorHandler(error);

  useLockBody(open);

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return (
      <ReactorModal title="0 like" open={open} onHide={onClose}>
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
        <ReactorItemSkeleton />
      </ReactorModal>
    );
  }

  if (errors) {
    return (
      <ReactorModal
        title="Fetching reactors errors"
        open={open}
        onHide={onClose}
      >
        {typeof errors === "string" ? (
          <li className={className.errorItem}>{errors}</li>
        ) : (
          errors.map((err, index) => (
            <li key={index} className={className.errorItem}>
              {err}
            </li>
          ))
        )}
      </ReactorModal>
    );
  }

  if (!data || data.postReactedBy.edges.length === 0) {
    return (
      <ReactorModal title="0 like" open={open} onHide={onClose}>
        <li className={className.noText}>No one reacted!</li>
      </ReactorModal>
    );
  }

  const { hasNext, endCursor } = data.postReactedBy.pageInfo;
  const { edges, total } = data.postReactedBy;

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
              postReactedBy: {
                ...prev.postReactedBy,
                pageInfo: { ...prev.postReactedBy.pageInfo, hasNext: false },
              },
            };
          }
          return {
            postReactedBy: {
              ...fetchMoreResult.postReactedBy,
              edges: _uniqBy(
                [
                  ...prev.postReactedBy.edges,
                  ...fetchMoreResult.postReactedBy.edges,
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
    <ReactorModal
      title={countConvert(total, "like")}
      open={open}
      onHide={onClose}
    >
      {edges.map((edge) => (
        <ReactorModalItem user={edge.node} key={edge.cursor} />
      ))}
      {networkStatus === NetworkStatus.fetchMore && <ReactorItemSkeleton />}
      {hasNext && <ReactorItemMoreBtn onClick={fetchMoreHandler} />}
    </ReactorModal>
  );
}
