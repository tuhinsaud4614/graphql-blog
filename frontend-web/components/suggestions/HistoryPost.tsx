import { ROUTES } from "@constants";
import classNames from "classnames";
import { Button } from "components";
import Image from "next/image";
import Link from "next/link";

const className = {
  root: "flex",
  left: "flex flex-col flex-1 min-w-0 pr-5",
  title:
    "line-clamp-2 md1:text-[1.375rem] font-bold leading-5 md1:leading-7 text-neutral dark:text-neutral-dark text-ellipsis",
  body: "pt-1 text-neutral/50 dark:text-neutral-dark/50 hidden md:line-clamp-2 text-ellipsis",
  imgContainer: "w-14 h-14 md:w-28 md:h-28 bg-neutral/5 relative",
  img: "absolute z-10 inset-0 w-full h-full",
  bottom: "pt-4 flex items-center justify-between",
};

interface Props {
  classes?: {
    root?: string;
    left?: string;
    title?: string;
    body?: string;
    timeBox?: string;
    tag?: string;
    imgContainer?: string;
  };
}

export default function HistoryPost({ classes }: Props) {
  return (
    <li className={classNames(className.root, classes?.root)}>
      <div className={classNames(className.left, classes?.left)}>
        <Link href={ROUTES.post("1")} passHref>
          <a className={classNames(className.title, classes?.title)}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio.
          </a>
        </Link>
        <Link href={ROUTES.post("1234")} passHref>
          <a className={classNames(className.body, classes?.body)}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio.
          </a>
        </Link>
        <div className={classNames(className.bottom, classes?.timeBox)}>
          <time className="text-xs text-neutral/70 dark:text-neutral-dark/70">
            Jun 11
          </time>
          <Button
            type="button"
            aria-label="Remove"
            className="!px-2 !py-0.5 text-sm"
            onClick={() => {}}
            mode="text"
            variant="error"
            // disabled
          >
            Remove
          </Button>
        </div>
      </div>
      <div
        className={classNames(className.imgContainer, classes?.imgContainer)}
      >
        <Image src="/demo.png" alt="Post" objectFit="cover" layout="fill" />
      </div>
    </li>
  );
}
