"use client";

import ErrorBox from "@/components/ErrorBox";
import LinkButton from "@/components/ui/LinkButton";
import { useGetTagsWithOffsetQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import SidebarContent from "./Content";
import SidebarSkeleton from "./Skeleton";

const className = {
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  item: "text-sm !rounded-full inline-block",
  divider: "w-full border-b dark:border-base-300 my-4",
};

export default function SidebarTags() {
  const { data, loading, refetch, error } = useGetTagsWithOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 10, page: 1 },
  });

  if (loading) {
    return (
      <>
        <SidebarSkeleton />
        <hr className={className.divider} />
      </>
    );
  }
  if (error) {
    return (
      <ErrorBox
        title="Fetching tags errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
          title: "text-base",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.error("Fetching tags errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.tagsWithOffset.results.length === 0) {
    return null;
  }

  return (
    <>
      <SidebarContent
        title="Recommended tags"
        classes={{ items: className.items }}
      >
        {data.tagsWithOffset.results.map((tag) => (
          <li className="first:ml-3 first:mt-3" key={tag.id}>
            <LinkButton
              variant="neutral"
              mode="outline"
              className={className.item}
              aria-label={tag.title}
              href={ROUTES.user.postsByTag(tag.id)}
            >
              {tag.title}
            </LinkButton>
          </li>
        ))}
      </SidebarContent>
      <hr className={className.divider} />
    </>
  );
}
