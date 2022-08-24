import { ErrorBox, LinkButton } from "components";
import { SidebarContent, SidebarSkeleton } from "components/Sidebar";
import { useGetTagsOnOffsetQuery } from "graphql/generated/schema";
import { Fragment } from "react";
import { gplErrorHandler, isDev } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  item: "text-sm first:mt-3 first:ml-3 !rounded-full",
  divider: "w-full border-b dark:border-base-dark-300 my-4",
};

export default function Tags() {
  const { data, loading, refetch, error } = useGetTagsOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 10, page: 1 },
  });

  if (loading) {
    return (
      <Fragment>
        <SidebarSkeleton />
        <hr className={className.divider} />
      </Fragment>
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
            isDev() && console.log("Fetching tags errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.tagsOnOffset.results.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <SidebarContent
        title="Recommended tags"
        classes={{ items: className.items }}
      >
        {data.tagsOnOffset.results.map((tag, index) => (
          <LinkButton
            key={tag.id}
            variant="neutral"
            mode="outline"
            className={className.item}
            anchorProps={{ "aria-label": tag.title }}
            passHref
            href={ROUTES.postsByTag(tag.id)}
          >
            {tag.title}
          </LinkButton>
        ))}
      </SidebarContent>
      <hr className={className.divider} />
    </Fragment>
  );
}
