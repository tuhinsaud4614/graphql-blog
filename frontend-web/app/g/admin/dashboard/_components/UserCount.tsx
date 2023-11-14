"use client";

import { Users } from "lucide-react";
import { toast } from "sonner";

import Counter from "@/components/Counter";
import { useGetUserCountQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";

import AdminDashboardCard from "./Card";

export default function AdminDashboardUserCount() {
  const { data, loading } = useGetUserCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });
  const value = data?.userCount || 0;
  return (
    <AdminDashboardCard
      icon={<Users className="h-8 w-8 text-primary" />}
      title="Users"
      loading={loading}
      href={ROUTES.admin.posts}
    >
      <span className="text-secondary selection:bg-secondary selection:text-secondary-foreground">
        <Counter value={value} />
      </span>
    </AdminDashboardCard>
  );
}
