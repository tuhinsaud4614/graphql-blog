import * as React from "react";

import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";

import { FImageFragment } from "@/graphql/generated/schema";
import { useEventListener, useLockBody } from "@/hooks";
import { cn, generateFileUrl } from "@/utils";

const className = {
  root: "relative w-full",
  shade: "fixed inset-0 bg-white z-[998]",
  shadeOpen: "pointer-events-auto opacity-1",
  shadeClose: "pointer-events-none opacity-0",
  img: "inset-0",
  imgClose: "absolute w-full h-full z-30",
  imgOpen: "fixed w-auto h-auto m-auto max-w-full z-[999]",
};

const transition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
};

interface Props {
  image: FImageFragment;
  alt: string;
}

const Img = ({ image, alt }: Props) => {
  const [isOpen, setOpen] = React.useState(false);

  useEventListener("scroll", () => isOpen && setOpen(false));

  useLockBody(isOpen);

  return (
    <div
      className={cn(
        className.root,
        "pt-[56.25%]",
        isOpen ? "cursor-zoom-out" : "cursor-zoom-in",
      )}
    >
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className={cn(
          className.shade,
          isOpen ? className.shadeOpen : className.shadeClose,
        )}
        onClick={() => setOpen(false)}
      />
      <AnimatePresence>
        <motion.div
          onClick={() => setOpen(!isOpen)}
          className={cn(
            className.img,
            "scale-1",
            isOpen ? className.imgOpen : className.imgClose,
          )}
          layout
          transition={transition}
        >
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={generateFileUrl(image.url)!}
            alt={alt}
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Img;
