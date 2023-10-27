"use client";

import { NetworkStatus } from "@apollo/client";

import ErrorBox from "@/components/ErrorBox";
import LinkButton from "@/components/ui/LinkButton";
import { useGetTagsWithOffsetQuery } from "@/graphql/generated/schema";
import useSynchronizeAnimation from "@/hooks/useSynchronizeAnimation";
import { ROUTES } from "@/lib/constants";
import { gplErrorHandler } from "@/lib/utils";

const className = {
  root: "border-b md1:border-0 md1:min-w-[17.75rem] md1:max-w-[18rem] relative px-4 md1:pl-0",
  container: "md1:sticky md1:left-0 md1:right-0 md1:top-[6.6875rem]",
  content: "pb-6 pt-6 md1:pt-0",
  title:
    "text-xs font-bold text-neutral mb-4 uppercase selection:bg-neutral selection:text-base-100",
  items: "flex flex-wrap space-x-2 space-y-2 -mt-2 -ml-2",
  skeleton:
    "bg-neutral/20 animate-pulse w-20 h-8 rounded first:mt-2 first:ml-2",
};

export default function Sidebar() {
  return (
    <aside className={className.root}>
      <div className={className.container}>
        <div className={className.content}>
          <p className={className.title}>
            DISCOVER MORE OF WHAT MATTERS TO YOU
          </p>
          <Result />
        </div>
      </div>
    </aside>
  );
}

function Result() {
  const { data, loading, error, refetch, networkStatus } =
    useGetTagsWithOffsetQuery({
      notifyOnNetworkStatusChange: true,
      variables: { limit: 10, page: 1 },
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return (
      <div className={className.items}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching tags errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "",
        }}
        onRetry={async () => {
          await refetch();
        }}
      />
    );
  }

  return (
    <section className={className.items}>
      {data?.tagsWithOffset.results.map((tag) => (
        <LinkButton
          key={tag.id}
          variant="neutral"
          mode="outline"
          className="!rounded text-sm first:ml-2 first:mt-2"
          anchorProps={{ "aria-label": tag.title }}
          passHref
          href={ROUTES.postsByTag(tag.id)}
        >
          {tag.title}
        </LinkButton>
      ))}
    </section>
  );
}

function Skeleton() {
  const rippleRef = useSynchronizeAnimation<HTMLSpanElement>("animate-pulse");
  return <span ref={rippleRef} className={className.skeleton} />;
}
