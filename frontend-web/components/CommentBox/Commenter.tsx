import { IUser } from "@interfaces";
import { DemoAvatar } from "components";
import { motion } from "framer-motion";
import Image from "next/image";
import { generateFileUrl, getUserName } from "utils";

const className = {
  header: "px-3.5 mb-1.5 flex items-center",
  img: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  name: "text-neutral dark:text-neutral-dark text-sm line-clamp-1 text-ellipsis break-all",
};

interface Props {
  user: IUser;
}

export default function Commenter({ user }: Props) {
  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
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
        {imgUrl ? (
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            priority
            src={imgUrl}
            alt={userName}
            width={32}
            height={32}
            layout="responsive"
            objectFit="cover"
          />
        ) : (
          <DemoAvatar aria-label={userName} className="w-8 h-8" />
        )}
      </span>
      <p className={className.name}>{userName}</p>
    </motion.div>
  );
}
