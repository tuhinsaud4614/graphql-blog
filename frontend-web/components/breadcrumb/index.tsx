import { forwardRef } from "react";

import Link from "next/link";

import { HTMLMotionProps } from "framer-motion";
import * as motion from "framer-motion/client";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
  params?: Record<string, string>;
  isActive?: boolean;
}

function Breadcrumb({ className, ...props }: HTMLMotionProps<"nav">) {
  return (
    <motion.nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: HTMLMotionProps<"ol">) {
  return (
    <motion.ol
      data-slot="breadcrumb-list"
      className={cn("inline-flex text-muted-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: HTMLMotionProps<"li">) {
  return (
    <motion.li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

type BreadcrumbLinkProps = HTMLMotionProps<"a"> & {
  href: string;
  as?: "a" | typeof Link;
};

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, as: Component = Link, href, ...props }, ref) => {
    const MotionLink = motion.create(Link);

    return Component === "a" ? (
      <motion.a
        ref={ref}
        data-slot="breadcrumb-link"
        className={cn(
          "cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline",
          className,
        )}
        href={href}
        {...props}
      />
    ) : (
      <MotionLink
        ref={ref}
        data-slot="breadcrumb-link"
        className={cn(
          "cursor-pointer underline-offset-4 transition-colors hover:text-foreground hover:underline",
          className,
        )}
        href={href}
        {...props}
      />
    );
  },
);

BreadcrumbLink.displayName = "BreadcrumbLink";

function BreadcrumbSeparator({ className, ...props }: HTMLMotionProps<"li">) {
  return (
    <motion.li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("px-1 [&>svg]:size-4", className)}
      {...props}
    >
      <ChevronRightIcon />
    </motion.li>
  );
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
};

