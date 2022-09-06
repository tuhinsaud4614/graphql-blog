import { ROUTES } from "@constants";
import { UserLink } from "components";
import { GetPostItemFragment } from "graphql/generated/schema";
import moment from "moment";
import Link from "next/link";
import { getUserName } from "utils";

const className = {
  root: "flex flex-col",
  content: "mt-2",
  title: "font-bold text-neutral dark:text-neutral-dark",
  timeBox:
    "pt-2 flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

interface Props {
  post: GetPostItemFragment;
}

export default function PostItem({ post }: Props) {
  const userName = getUserName(post.author);
  return (
    <li className={className.root}>
      <UserLink
        href={ROUTES.authorProfile(post.author.id)}
        src={post.author.avatar?.url}
      >
        {userName}
      </UserLink>
      <div className={className.content}>
        <Link href={ROUTES.post(post.id)} passHref>
          <a aria-label={post.title} className={className.title}>
            {post.title}
          </a>
        </Link>
        <div className={className.timeBox}>
          <time>
            {moment(+post.updatedAt)
              .startOf("second")
              .fromNow()}
          </time>
        </div>
      </div>
    </li>
  );
}
