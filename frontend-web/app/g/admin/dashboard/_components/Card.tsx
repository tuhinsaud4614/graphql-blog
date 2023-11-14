"use client";

import * as React from "react";

import Link, { LinkProps } from "next/link";

import { Loader } from "lucide-react";

interface Props {
  title: string;
  icon: React.ReactNode;
  loading: boolean;
  children?: React.ReactNode;
  href: LinkProps["href"];
}

export default function AdminDashboardCard({
  title,
  icon,
  loading,
  children,
  href,
}: Props) {
  return (
    <div className="rounded-xl bg-secondary/5 p-6 shadow-mui transition-colors dark:bg-base-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <Link
            href={href}
            aria-label={title}
            className="font-medium tracking-tight text-primary no-underline selection:bg-primary selection:text-primary-foreground hover:text-primary-focus"
          >
            {title}
          </Link>
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
