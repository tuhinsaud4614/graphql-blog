"use client";

import ErrorBox from "@/components/ErrorBox";
import { useGetCategoriesWithOffsetQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import SidebarCategory from "./Category";
import SidebarContent from "./Content";
import SidebarSkeleton from "./Skeleton";

const className = {
  divider: "w-full border-b dark:border-base-300 my-4",
};

export default function SidebarCategories() {
  const { data, loading, refetch, error } = useGetCategoriesWithOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 6, page: 1 },
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
            isDev() && console.error("Fetching categories errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.categoriesWithOffset.data.length === 0) {
    return null;
  }

  return (
    <>
      <SidebarContent
        title="Categories"
        moreLink={ROUTES.user.categories}
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
            link={ROUTES.user.postsByCategory(category.id)}
          />
        ))}
      </SidebarContent>
      <hr className={className.divider} />
    </>
  );
}
