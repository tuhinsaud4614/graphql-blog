import classNames from "classnames";
import { BiBell, BiGlobe } from "react-icons/bi";

import {
  Badge,
  Button,
  ClientOnly,
  LinkButton,
  Theme,
  UserAvatarBtn,
} from "@component";
import STYLES from "@styles";
import Hamburger from "./Hamburger";

export default function Header() {
  return (
    <header className="sticky left-auto top-0 z-[1100] bg-base-200 py-4 shadow-mui dark:bg-base-dark-200">
      <section className="max-w-screen-xl px-4 md:px-6 xl:mx-auto">
        <nav className="flex items-center">
          <div className="flex shrink-0 items-center gap-4">
            <ClientOnly>
              <Hamburger />
            </ClientOnly>
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
                  className={classNames(
                    STYLES.indicator.item,
                    "!min-h-[0.75rem] !min-w-[0.75rem] !p-0 ring-0",
                  )}
                  float={false}
                />
                <BiBell size={24} />
              </span>
            </Button>
            <ClientOnly>
              <UserAvatarBtn
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                hideOnSmallDevice
              />
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
