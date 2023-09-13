import dynamic from "next/dynamic";

import { BiBell, BiGlobe } from "react-icons/bi";

import { Badge, Button, ClientOnly, LinkButton, Theme } from "@/components";
import { cn } from "@/utils";
import STYLES from "@/utils/styles";

const Hamburger = dynamic(() => import("./Hamburger"), {
  ssr: false,
});

const UserAvatarBtn = dynamic(() =>
  import(/* webpackChunkName: "UserAvatarBtn" */ "@/components").then(
    ({ UserAvatarBtn }) => UserAvatarBtn,
  ),
);

export default function Header() {
  return (
    <header
      className={cn(
        "sticky left-auto top-0 bg-base-200 py-4 shadow-mui dark:bg-base-dark-200",
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
              passHref
            >
              <BiGlobe size={24} />
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
                <BiBell size={24} />
              </span>
            </Button>
            <UserAvatarBtn
              anchorOrigin={{ horizontal: "left", vertical: "top" }}
              hideOnSmallDevice
            />
            <ClientOnly>
              <Theme
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                classes={{ menuRoot: "mt-6" }}
              />
            </ClientOnly>
          </div>
        </nav>
      </section>
    </header>
  );
}
