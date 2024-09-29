"use client";

import { Tag } from "lucide-react";
import { toast } from "sonner";

import Counter from "@/components/Counter";
import { useGetTagCountQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";

import AdminDashboardCard from "./Card";

export default function AdminDashboardTagCount() {
  const { data, loading } = useGetTagCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });
  const value = data?.tagCount || 0;
  return (
    <AdminDashboardCard
      icon={<Tag className="h-8 w-8 text-primary" />}
      title="Tags"
      loading={loading}
      href={ROUTES.admin.tags}
    >
      <span className="text-secondary selection:bg-secondary selection:text-secondary-foreground">
        <Counter value={value} />
      </span>
    </AdminDashboardCard>
  );
}
