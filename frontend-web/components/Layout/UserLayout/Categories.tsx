import * as React from "react";

import { ErrorBox } from "@/components";
import {
  SidebarCategory,
  SidebarContent,
  SidebarSkeleton,
} from "@/components/Sidebar";
import { useGetCategoriesWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  divider: "w-full border-b dark:border-base-dark-300 my-4",
};

export default function Categories() {
  const { data, loading, refetch, error } = useGetCategoriesWithOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 6, page: 1 },
  });

  if (loading) {
    return (
      <React.Fragment>
        <SidebarSkeleton />
        <hr className={className.divider} />
      </React.Fragment>
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

  if (!data || data.categoriesWithOffset.data.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <SidebarContent
        title="Categories"
        moreLink={ROUTES.categories}
        moreText={
          data.categoriesWithOffset.pageInfo?.hasNext
            ? "See all the categories"
            : undefined
        }
      >
        {data.categoriesWithOffset.data.map((category) => (
          <SidebarCategory
            key={category.id}
            title={category.title}
            link={ROUTES.postsByCategory(category.id)}
          />
        ))}
      </SidebarContent>
      <hr className={className.divider} />
    </React.Fragment>
  );
}
