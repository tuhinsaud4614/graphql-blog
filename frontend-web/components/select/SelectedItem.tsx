import { motion } from "framer-motion";
import { ReactNode } from "react";
import { BiX } from "react-icons/bi";

const className = {
  root: "rounded-sm flex items-center bg-base-200 first:ml-1 first:mt-1",
  text: "py-[0.1875rem] px-1.5 text-sm line-clamp-1 text-ellipsis",
  btn: "px-1 border-none outline-none text-error hover:text-error-focus active:scale-95",
};

interface Props {
  onClose?(): void;
  children: ReactNode;
}

export default function SelectedItem({ children, onClose }: Props) {
  return (
    <motion.span
      className={className.root}
      layout
      initial={{ width: 0, opacity: 0 }}
      exit={{ width: 0, opacity: 0 }}
      animate={{ width: "auto", opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className={className.text}>{children}</span>
      <button
        aria-label="Close"
        type="button"
        className={className.btn}
        onClick={onClose}
      >
        <BiX size={14} />
      </button>
    </motion.span>
  );
}
