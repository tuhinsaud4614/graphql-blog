"use client";

import { Tag } from "lucide-react";
import { toast } from "sonner";

import { useGetTagCountQuery } from "@/graphql/generated/schema";

import AdminDashboardCard from "./Card";

export default function AdminDashboardTagCount() {
  const { data, loading } = useGetTagCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });
  return (
    <AdminDashboardCard
      icon={<Tag className="h-8 w-8 text-primary" />}
      title="Tags"
      value={loading ? undefined : data?.tagCount || 0}
    />
  );
}
