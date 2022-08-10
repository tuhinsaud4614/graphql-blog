import { NetworkStatus } from "@apollo/client";
import {
  ClientOnly,
  ErrorBox,
  NoResultFound,
  PostItem,
  PostItemSkeleton,
} from "components";
import { useGetPostsQuery } from "graphql/generated/schema";
import { Fragment, PropsWithChildren } from "react";
import { gplErrorHandler } from "utils";
import Sidebar from "./Sidebar";

const className = {
  root: "flex flex-col md1:flex-row-reverse sm:mx-auto max-w-5xl md1:pt-10 pb-4",
  items:
    "md1:basis-full px-4 list-none m-0 pt-10 md1:pt-3 pb-3 flex flex-col space-y-12",
};

export default function Content() {
  const { data, error, loading, refetch, networkStatus } = useGetPostsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: 2 },
  });

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

  return (
    <Wrapper>
      <ul className={className.items}>
        {data.posts.edges.map((edge) => (
          <PostItem post={edge.node} key={edge.node.id} />
        ))}
        {(loading || networkStatus === NetworkStatus.refetch) && (
          <Fragment>
            <PostItemSkeleton />
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
      <ClientOnly>
        <Sidebar />
      </ClientOnly>
      {children}
    </section>
  );
}
