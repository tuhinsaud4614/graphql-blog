import { ROUTES } from "@constants";
import { ErrorBox } from "components";
import {
  SidebarCategory,
  SidebarContent,
  SidebarSkeleton,
} from "components/Sidebar";
import { useGetCategoriesOnOffsetQuery } from "graphql/generated/schema";
import { Fragment } from "react";
import { gplErrorHandler, isDev } from "utils";

const className = {
  divider: "w-full border-b dark:border-base-dark-300 my-4",
};

export default function Categories() {
  const { data, loading, refetch, error } = useGetCategoriesOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 6, page: 1 },
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
        title="Fetching categories errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
          title: "text-base",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.log("Fetching categories errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.categoriesOnOffset.data.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <SidebarContent
        title="Categories"
        moreLink={ROUTES.categories}
        moreText={
          data.categoriesOnOffset.pageInfo?.hasNext
            ? "See all the categories"
            : undefined
        }
      >
        {data.categoriesOnOffset.data.map((category) => (
          <SidebarCategory
            key={category.id}
            title={category.title}
            link={ROUTES.postsByCategory(category.id)}
          />
        ))}
      </SidebarContent>
      <hr className={className.divider} />
    </Fragment>
  );
}
