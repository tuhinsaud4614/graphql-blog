"use client";

import { Users } from "lucide-react";
import { toast } from "sonner";

import { useGetUserCountQuery } from "@/graphql/generated/schema";

import AdminDashboardCard from "./Card";

export default function AdminDashboardUserCount() {
  const { data, loading } = useGetUserCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });
  return (
    <AdminDashboardCard
      icon={<Users className="h-8 w-8 text-primary" />}
      title="Users"
      value={loading ? undefined : data?.userCount || 0}
    />
  );
}
