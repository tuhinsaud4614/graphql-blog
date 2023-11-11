"use client";

import { toast } from "sonner";

import CategoryIcon from "@/components/svg/Category";
import { useGetCategoryCountQuery } from "@/graphql/generated/schema";

import AdminDashboardCard from "./Card";

export default function AdminDashboardCategoryCount() {
  const { data, loading } = useGetCategoryCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });

  return (
    <AdminDashboardCard
      icon={<CategoryIcon className="h-8 w-8 text-primary" />}
      title="Categories"
      value={loading ? undefined : data?.categoryCount || 0}
    />
  );
}
