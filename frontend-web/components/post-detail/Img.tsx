import { useEventListener } from "@hooks";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const className = {
  root: "relative w-full",
  shade: "fixed inset-0 bg-white z-[998]",
  shadeOpen: "pointer-events-auto opacity-1",
  shadeClose: "pointer-events-none opacity-0",
  img: "inset-0",
  imgClose: "absolute w-full h-full z-50",
  imgOpen: "fixed w-auto h-auto m-auto max-w-full z-[999]",
};

const transition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
};

const Img = () => {
  const [isOpen, setOpen] = useState(false);

  useEventListener("scroll", () => isOpen && setOpen(false));

  return (
    <div
      className={classNames(
        className.root,
        "pt-[56.25%]",
        isOpen ? "cursor-zoom-out" : "cursor-zoom-in"
      )}
    >
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className={classNames(
          className.shade,
          isOpen ? className.shadeOpen : className.shadeClose
        )}
        onClick={() => setOpen(false)}
      />
      <AnimatePresence>
        <motion.div
          onClick={() => setOpen(!isOpen)}
          className={classNames(
            className.img,
            "scale-1",
            isOpen ? className.imgOpen : className.imgClose
          )}
          layout
          transition={transition}
        >
          <Image
            src="/demo.png"
            alt="Detail"
            layout="fill"
            objectFit="contain"
          />
        </motion.div>

        {/* <motion.img
          src="/demo.png"
          alt="Detail"
          onClick={() => setOpen(!isOpen)}
          className={classNames(
            className.img,
            isOpen ? className.imgOpen : className.imgClose
          )}
          // width={700}
          // height={533}
          layout
          transition={transition}
        /> */}
      </AnimatePresence>
    </div>
  );
};

export default Img;
