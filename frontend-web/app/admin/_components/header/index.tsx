"use client";

import { BellIcon, GlobeIcon } from "lucide-react";

import { ClientOnly } from "@/components";
import ThemeSwitch from "@/components/theme-switch";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

import Hamburger from "./Hamburger";
import UserShortProfile from "./UserShortProfile";

export default function AdminLayoutHeader() {
  return (
    <header
      className={cn(
        "sticky left-auto top-0 bg-base-200 py-4 shadow-mui",
        STYLES.zIndex.header,
      )}
    >
      <section className="max-w-screen-xl px-4 md:px-6 xl:mx-auto">
        <nav className="flex items-center">
          <div className="flex shrink-0 items-center gap-4">
            <ClientOnly>
              <Hamburger />
            </ClientOnly>
            <LinkButton
              href="/"
              variant="accent"
              className="hidden items-center gap-2 rounded-l-3xl !rounded-br-3xl rounded-tr-lg px-3 py-2 text-sm font-semibold uppercase sm:inline-flex"
            >
              <GlobeIcon size={16} />
              Browse Website
            </LinkButton>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-4 rounded-full">
            <Button mode="outline" className="size-9 rounded-full !p-0">
              <span className={STYLES.indicator.root}>
                <Badge
                  variant="error"
                  className={cn(
                    STYLES.indicator.item,
                    "!min-h-3 !min-w-3 !p-0 ring-0",
                  )}
                  float={false}
                />
                <BellIcon size={24} />
              </span>
            </Button>
            <UserShortProfile />
            <ClientOnly>
              <ThemeSwitch
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                tooltipOrigin={{ horizontal: "right", vertical: "bottom" }}
              />
            </ClientOnly>
          </div>
        </nav>
      </section>
    </header>
  );
}
