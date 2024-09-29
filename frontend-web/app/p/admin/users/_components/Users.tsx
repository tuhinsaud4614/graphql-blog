"use client";

import { NetworkStatus } from "@apollo/client";

import ErrorBox from "@/components/ErrorBox";
import TableSkeleton from "@/components/data-table/Skeleton";
import { useGetUsersWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import AdminUserList from "./List";

export default function AdminUsers() {
  // const { limit, page } = useIntegerQueryValue(["page", "limit"]);
  const { data, refetch, error, loading, networkStatus } =
    useGetUsersWithOffsetQuery({
      notifyOnNetworkStatusChange: true,
      // variables: { limit: limit || 10, page: page || 1 },
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching users errors"
        errors={gplErrorHandler(error)}
        onRetry={refetch}
      />
    );
  }

  return <AdminUserList users={data?.usersWithOffset.data || []} />;
}
