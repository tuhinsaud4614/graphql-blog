"use client";

import { Loader } from "lucide-react";

import Counter from "@/components/Counter";

interface Props {
  title: string;
  icon: React.ReactNode;
  value?: number;
}

export default function AdminDashboardCard({ title, icon, value }: Props) {
  return (
    <div className="rounded-xl bg-secondary/5 p-6 shadow-mui transition-colors dark:bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="font-medium tracking-tight text-primary selection:bg-primary selection:text-primary-foreground">
            {title}
          </h3>
          <div className="mt-2 text-2xl font-medium text-secondary selection:bg-secondary selection:text-secondary-foreground">
            {value === undefined ? (
              <Loader className="animate-spin text-secondary" />
            ) : value === 0 ? (
              0
            ) : (
              <Counter value={value} />
            )}
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
}
