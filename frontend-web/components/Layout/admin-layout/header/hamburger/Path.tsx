import type { SVGMotionProps } from "framer-motion";
import { motion } from "framer-motion";

export default function Path(props: SVGMotionProps<SVGPathElement>) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      strokeLinecap="round"
      {...props}
    />
  );
}
