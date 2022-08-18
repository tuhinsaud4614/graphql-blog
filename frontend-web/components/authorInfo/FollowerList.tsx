import { useLockBody } from "@hooks";
import classNames from "classnames";
import { ErrorBox, ReactorModal } from "components";
import { useGetAuthorFollowersOnCursorQuery } from "graphql/generated/schema";
import { Fragment, useState } from "react";
import { gplErrorHandler, isDev } from "utils";
import FollowingItem from "./FollowingItem";
import FollowingItemSkeleton from "./FollowingItemSkeleton";

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
    pageInfo: { hasNext, endCursor },
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
      <SeeAll />
    </div>
  );
}

function SeeAll() {
  const [open, setOpen] = useState(false);
  useLockBody(open);
  return (
    <Fragment>
      <button
        type="button"
        aria-label="See all"
        className={className.more}
        onClick={() => setOpen(true)}
      >
        See all (96)
      </button>
      <ReactorModal
        title="96 followers"
        open={open}
        onHide={() => setOpen(false)}
      >
        {/* {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))} */}
      </ReactorModal>
    </Fragment>
  );
}
