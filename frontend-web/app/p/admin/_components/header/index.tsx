import dynamic from "next/dynamic";

import { Bell, Globe } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";
import { skeletonVariant } from "@/lib/variants/classVariants";

const Hamburger = dynamic(() => import("./Hamburger"), {
  ssr: false,
});

const UserShortProfile = dynamic(
  () => import(/* webpackChunkName: "UserShortProfile" */ "./UserShortProfile"),
);

const ThemeButton = dynamic(() => import("@/components/theme-switch"), {
  ssr: false,
  loading() {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  },
});

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
            <Hamburger />
            <LinkButton
              href="/"
              variant="accent"
              className="hidden min-h-[2.5rem] items-center gap-2 !py-0 text-sm font-semibold capitalize sm:flex"
            >
              <Globe size={24} />
              Browse Website
            </LinkButton>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-4 rounded-full">
            <Button mode="outline" className="h-9 w-9 rounded-full !p-0">
              <span className={STYLES.indicator.root}>
                <Badge
                  variant="error"
                  className={cn(
                    STYLES.indicator.item,
                    "!min-h-[0.75rem] !min-w-[0.75rem] !p-0 ring-0",
                  )}
                  float={false}
                />
                <Bell size={24} />
              </span>
            </Button>
            <UserShortProfile />
            <ThemeButton
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              classes={{ menuRoot: "mt-6" }}
            />
          </div>
        </nav>
      </section>
    </header>
  );
}
