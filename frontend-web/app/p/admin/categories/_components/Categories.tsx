"use client";

import { NetworkStatus } from "@apollo/client";

import ErrorBox from "@/components/ErrorBox";
import TableSkeleton from "@/components/data-table/Skeleton";
import { useGetCategoriesWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import AdminCreateCategory from "./CreateCategory";
import AdminCategoryList from "./List";

export default function AdminCategories() {
  const { data, refetch, error, loading, networkStatus } =
    useGetCategoriesWithOffsetQuery({
      notifyOnNetworkStatusChange: true,
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching categories errors"
        errors={gplErrorHandler(error)}
        onRetry={refetch}
      />
    );
  }

  return (
    <AdminCategoryList categories={data?.categoriesWithOffset.data || []}>
      <AdminCreateCategory />
    </AdminCategoryList>
  );
}
