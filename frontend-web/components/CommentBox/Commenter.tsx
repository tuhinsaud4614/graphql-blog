import { motion } from "framer-motion";
import Image from "next/image";

const className = {
  header: "px-3.5 mb-1.5 flex items-center",
  img: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  name: "text-neutral text-sm",
};

export default function Commenter() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        maxHeight: 0,
        marginBottom: 0,
      }}
      animate={{
        opacity: 1,
        maxHeight: 100,
        marginBottom: 6,
      }}
      transition={{
        duration: 0.3,
        bounce: 0,
      }}
      exit={{
        opacity: 0,
        maxHeight: 0,
        marginBottom: 0,
      }}
      className={className.header}
    >
      <span className={className.img}>
        <Image
          src="/demo.png"
          alt="Avatar"
          width={32}
          height={32}
          layout="responsive"
          objectFit="cover"
        />
      </span>
      <p className={className.name}>My Name</p>
    </motion.div>
  );
}
