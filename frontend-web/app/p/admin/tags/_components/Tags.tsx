"use client";

import { NetworkStatus } from "@apollo/client";

import ErrorBox from "@/components/ErrorBox";
import TableSkeleton from "@/components/data-table/Skeleton";
import { useGetTagsWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import AdminCreateTag from "./CreateTag";
import AdminTagList from "./List";

export default function AdminTags() {
  const { data, refetch, error, loading, networkStatus } =
    useGetTagsWithOffsetQuery({
      notifyOnNetworkStatusChange: true,
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching tags errors"
        errors={gplErrorHandler(error)}
        onRetry={refetch}
      />
    );
  }

  return (
    <AdminTagList tags={data?.tagsWithOffset.results || []}>
      <AdminCreateTag />
    </AdminTagList>
  );
}
