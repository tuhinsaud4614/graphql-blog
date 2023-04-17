import * as React from "react";

import classNames from "classnames";

import { ErrorBox, ReactorModal } from "@/components";
import { useGetAuthorFollowersOnCursorQuery } from "@/graphql/generated/schema";
import { useLockBody } from "@/hooks";
import { countConvert, gplErrorHandler, isDev } from "@/utils";

import FollowingItem from "../FollowingItem";
import FollowingItemSkeleton from "../FollowingItemSkeleton";
import SeeMoreFollow from "./SeeMoreFollow";

const className = {
  root: "flex flex-col mt-10 mb-8",
  title: "text-base font-medium text-neutral dark:text-neutral-dark",
  items: "list-none my-4 flex flex-col space-y-1",
  more: "text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95 self-start",
};

interface Props {
  authorId: string;
}

export default function FollowerList({ authorId }: Props) {
  const { data, error, loading, refetch } = useGetAuthorFollowersOnCursorQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { limit: 6, authorId },
  });

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
          title="Fetching followers errors"
          errors={gplErrorHandler(error)}
          classes={{
            root: "mt-6",
            title: "text-base",
          }}
          onRetry={async () => {
            try {
              await refetch();
            } catch (error) {
              isDev() && console.log("Fetching followers errors", error);
            }
          }}
        />
      </div>
    );
  }

  if (!data || data.authorFollowersOnCursor.edges.length === 0) {
    return null;
  }

  const {
    pageInfo: { hasNext },
    total,
    edges,
  } = data.authorFollowersOnCursor;

  return (
    <div className={className.root}>
      <h3 className={className.title}>Followers</h3>
      <ul className={className.items}>
        {edges.map(({ node }) => (
          <FollowingItem user={node} key={node.id} />
        ))}
      </ul>
      {hasNext && <SeeAll authorId={authorId} total={total} />}
    </div>
  );
}

function SeeAll({ total, authorId }: { authorId: string; total: number }) {
  const [open, setOpen] = React.useState(false);
  useLockBody(open);

  return (
    <React.Fragment>
      <button
        type="button"
        aria-label="See all"
        className={className.more}
        onClick={() => setOpen(true)}
      >
        See all ({total})
      </button>
      <ReactorModal
        title={countConvert(total, "following")}
        open={open}
        onHide={() => setOpen(false)}
      >
        <SeeMoreFollow authorId={authorId} />
      </ReactorModal>
    </React.Fragment>
  );
}
