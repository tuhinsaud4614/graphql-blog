"use client";

import { NetworkStatus } from "@apollo/client";

import ErrorBox from "@/components/ErrorBox";
import { useGetCategoriesWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import AdminCategoryCreateButton from "./CreateButton";
import AdminCategoryList from "./List";
import AdminCategorySkeleton from "./Skeleton";

export default function AdminCategories() {
  const { data, refetch, error, loading, networkStatus } =
    useGetCategoriesWithOffsetQuery({
      variables: { limit: 10, page: 1 },
      notifyOnNetworkStatusChange: true,
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <AdminCategorySkeleton />;
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
      <AdminCategoryCreateButton />
    </AdminCategoryList>
  );
}
