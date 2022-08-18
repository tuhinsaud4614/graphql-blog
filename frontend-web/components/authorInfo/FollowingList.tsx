import { useLockBody } from "@hooks";
import classNames from "classnames";
import { ErrorBox, ReactorModal, ReactorModalItem } from "components";
import { useGetAuthorFollowingsOnCursorQuery } from "graphql/generated/schema";
import { Fragment, useState } from "react";
import { gplErrorHandler, isDev } from "utils";
import FollowingItem from "./FollowingItem";
import FollowingItemSkeleton from "./FollowingItemSkeleton";

const className = {
  root: "flex flex-col",
  title: "text-base font-medium text-neutral dark:text-neutral-dark",
  items: "list-none my-4 flex flex-col space-y-1",
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

interface Props {
  authorId: string;
}

export default function FollowingList({ authorId }: Props) {
  const { data, error, loading, refetch } = useGetAuthorFollowingsOnCursorQuery(
    {
      notifyOnNetworkStatusChange: true,
      variables: { limit: 6, authorId },
    }
  );

  if (loading) {
    return (
      <div className={classNames(className.root, "space-y-2")}>
        <FollowingItemSkeleton />
        <FollowingItemSkeleton />
        <FollowingItemSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className.root}>
        <ErrorBox
          title="Fetching followings errors"
          errors={gplErrorHandler(error)}
          classes={{
            root: "mt-6",
            title: "text-base",
          }}
          onRetry={async () => {
            try {
              await refetch();
            } catch (error) {
              isDev() && console.log("Fetching followings errors", error);
            }
          }}
        />
      </div>
    );
  }

  if (!data || data.authorFollowingsOnCursor.edges.length === 0) {
    return null;
  }

  const {
    pageInfo: { hasNext, endCursor },
    edges,
    total,
  } = data.authorFollowingsOnCursor;
  return (
    <div className={className.root}>
      <h3 className={className.title}>Following</h3>
      <ul className={className.items}>
        {edges.map(({ node }) => (
          <FollowingItem user={node} key={node.id} />
        ))}
      </ul>
      <SeeAll authorId={authorId} total={total} />
    </div>
  );
}

function SeeAll({ total, authorId }: { authorId: string; total: number }) {
  const [open, setOpen] = useState(false);

  const { data, error, loading, refetch } = useGetAuthorFollowingsOnCursorQuery(
    {
      notifyOnNetworkStatusChange: true,
      variables: { limit: 6, authorId },
    }
  );

  useLockBody(open);
  return (
    <Fragment>
      <button
        type="button"
        aria-label="See all"
        className={className.more}
        onClick={() => setOpen(true)}
      >
        See all ({total})
      </button>
      <ReactorModal
        title={`${total} following`}
        open={open}
        onHide={() => setOpen(false)}
      >
        {data?.authorFollowingsOnCursor.edges.map(({ node }) => (
          <ReactorModalItem key={node.id} user={node} />
        ))}
      </ReactorModal>
    </Fragment>
  );
}
