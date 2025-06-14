"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSegment,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  links: BreadcrumbSegment[];
}

export default function BreadCrumbsItems({
  className,
  links,
}: Readonly<Props>) {
  return (
    <Breadcrumb className={cn(className)}>
      <LayoutGroup>
        <BreadcrumbList
          layout
          className="items-center rounded-md bg-muted px-4 py-2"
        >
          <AnimatePresence initial={false}>
            {links.map((link, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.25 } }}
                  exit={{ opacity: 0 }}
                  className="flex min-w-12 items-center"
                  layout
                  key={link.label}
                >
                  {index > 0 && (
                    <BreadcrumbSeparator
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.35 }}
                    />
                  )}
                  <BreadcrumbItem
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.25 } }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      link.isActive
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.href ? (
                      <BreadcrumbLink href={link.href}>
                        {link.label}
                      </BreadcrumbLink>
                    ) : (
                      <span>{link.label}</span>
                    )}
                  </BreadcrumbItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </BreadcrumbList>
      </LayoutGroup>
    </Breadcrumb>
  );
}
