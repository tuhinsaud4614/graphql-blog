import { type SVGMotionProps, motion } from "framer-motion";

import { Button } from "@/components";
import { adminToggleSidebar, selectAdminSidebar } from "@/features";
import { useMediaQuery } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/store";
import { cn } from "@/utils";
import STYLES from "@/utils/styles";

function Path(props: SVGMotionProps<SVGPathElement>) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      strokeLinecap="round"
      {...props}
    />
  );
}

export default function Hamburger() {
  const matches = useMediaQuery("(min-width: 1280px)");
  const visible = useAppSelector(selectAdminSidebar);
  const rdxDispatch = useAppDispatch();

  if (matches) {
    return null;
  }

  return (
    <Button
      aria-label="Hamburger"
      type="button"
      mode="outline"
      variant="accent"
      onClick={() => rdxDispatch(adminToggleSidebar())}
      className={STYLES.btn.circle}
    >
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        className={cn(
          "mt-1 flex items-center justify-center",
          visible ? "ml-[0.1875rem]" : "ml-[0.0625rem]",
        )}
      >
        <Path
          animate={{
            d: visible ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5",
          }}
          className="stroke-current"
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          animate={{ opacity: visible ? 0 : 1 }}
          transition={{ duration: 0.1 }}
          className="stroke-current"
        />
        <Path
          animate={{
            d: visible ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346",
          }}
          className="stroke-current"
        />
      </svg>
    </Button>
  );
}
