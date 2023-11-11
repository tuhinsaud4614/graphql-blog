"use client";

import { Loader } from "lucide-react";

interface Props {
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  children?: React.ReactNode;
}

export default function AdminDashboardCard({
  title,
  icon,
  loading,
  children,
}: Props) {
  return (
    <div className="rounded-xl bg-secondary/5 p-6 shadow-mui transition-colors dark:bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="font-medium tracking-tight text-primary selection:bg-primary selection:text-primary-foreground">
            {title}
          </h3>
          <div className="mt-2 flex items-center text-2xl font-medium">
            {loading ? (
              <Loader className="animate-spin text-secondary" />
            ) : (
              children
            )}
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
}
