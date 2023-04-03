import classNames from "classnames";
import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

import { Backdrop, Button, Portal } from "@component";
import {
  adminSetSidebar,
  adminToggleSidebar,
  selectAdminSidebar,
} from "@features";
import { useMediaQuery } from "@hooks";
import { useAppDispatch, useAppSelector } from "store";

const className = {
  root: "fixed left-0 top-0 z-[1103] h-screen bg-primary",
};

const Variants: Variants = {
  hidden: {
    x: "-100%",
    y: 0,
  },
  visible: {
    x: 0,
    y: 0,
  },
};

export default function Sidebar() {
  const matches = useMediaQuery("(min-width: 1280px)");
  const visible = useAppSelector(selectAdminSidebar);
  const rdxDispatch = useAppDispatch();

  const content = (
    <div className="flex items-center justify-between p-4">
      <Link href="/" passHref>
        <a
          className="flex h-[3.125rem] w-[3.125rem] items-center justify-center"
          aria-label="Home"
        >
          <Image
            src="/logo.svg"
            priority
            alt="The Rat Diary"
            height={50}
            width={50}
            layout="fixed"
          />
        </a>
      </Link>
      {matches && (
        <Button
          mode="text"
          className={classNames(
            "!p-2 text-base-100",
            !visible && "hidden group-hover:flex",
          )}
          onClick={() => rdxDispatch(adminToggleSidebar())}
        >
          <BiChevronRight
            className={classNames(
              "transition-transform duration-200",
              visible && "-rotate-180",
            )}
            size={24}
          />
        </Button>
      )}
    </div>
  );

  if (matches) {
    return (
      <aside
        className={classNames(
          className.root,
          "group duration-200 ease-in",
          visible ? "w-[17.5rem]" : "w-[5.375rem] hover:w-[17.5rem]",
        )}
      >
        {content}
      </aside>
    );
  }

  return (
    <Portal>
      <AnimatePresence initial={false}>
        {visible && (
          <Backdrop
            className="z-[1102] cursor-pointer"
            onClick={() => rdxDispatch(adminSetSidebar(false))}
          />
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter initial={false}>
        {visible && (
          <motion.aside
            className={classNames(className.root, "w-[17.5rem]")}
            variants={Variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            {content}
          </motion.aside>
        )}
      </AnimatePresence>
    </Portal>
  );
}
