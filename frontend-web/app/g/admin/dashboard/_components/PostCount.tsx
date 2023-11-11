"use client";

import { FileText } from "lucide-react";
import { toast } from "sonner";

import Counter from "@/components/Counter";
import { useGetPostCountQuery } from "@/graphql/generated/schema";

import AdminDashboardCard from "./Card";

export default function AdminDashboardPostCount() {
  const { data, loading } = useGetPostCountQuery({
    fetchPolicy: "network-only",
    errorPolicy: "all",
    onError(error) {
      toast.error(error.message, { position: "bottom-right" });
    },
  });

  const published = data?.postCount.published || 0;
  const unpublished = data?.postCount.unpublished || 0;
  return (
    <AdminDashboardCard
      icon={<FileText className="h-8 w-8 text-primary" />}
      title="Posts"
      loading={loading}
    >
      {!!published && !!unpublished && (
        <>
          <span className="selection:text-success-foreground text-success selection:bg-success">
            <Counter value={published} />
          </span>
          <span className="inline-block select-none px-1 text-neutral">+</span>
          <span className="selection:text-error-foreground text-error selection:bg-error">
            <Counter value={unpublished} />
          </span>
          <span className="inline-block select-none px-1 text-neutral">=</span>
        </>
      )}
      <span className="text-secondary selection:bg-secondary selection:text-secondary-foreground">
        <Counter value={published + unpublished} />
      </span>
    </AdminDashboardCard>
  );
}
