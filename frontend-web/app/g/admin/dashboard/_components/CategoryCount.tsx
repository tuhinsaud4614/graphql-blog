"use client";

import { toast } from "sonner";

import Counter from "@/components/Counter";
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

  const value = data?.categoryCount || 0;

  return (
    <AdminDashboardCard
      icon={<CategoryIcon className="h-8 w-8 text-primary" />}
      title="Categories"
      loading={loading}
    >
      <span className="text-secondary selection:bg-secondary selection:text-secondary-foreground">
        <Counter value={value} />
      </span>
    </AdminDashboardCard>
  );
}
