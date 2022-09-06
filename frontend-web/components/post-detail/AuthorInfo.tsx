import { ROUTES } from "@constants";
import DemoAvatar from "components/DemoAvatar";
import { FGetUserFragment } from "graphql/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { generateFileUrl, getUserName } from "utils";

const className = {
  root: "my-8 flex items-center",
  img: "w-12 h-12 inline-block rounded-full overflow-hidden mr-4 dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark",
  content: "flex flex-col justify-center flex-1 min-w-0",
  title: "text-neutral dark:text-neutral-dark line-clamp-1 text-ellipsis",
  timeBox: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
};

interface Props {
  author: FGetUserFragment;
  postDate: string;
}

export default function AuthorInfo({ author, postDate }: Props) {
  const userName = getUserName(author);
  const imgUrl = generateFileUrl(author.avatar?.url);
  return (
    <section className={className.root}>
      <Link href={ROUTES.authorProfile(author.id)} passHref>
        <a aria-label="Author Profile" className={className.img}>
          {imgUrl ? (
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality || 75}`
              }
              src={imgUrl}
              alt={userName}
              width={48}
              height={48}
              layout="responsive"
              objectFit="cover"
              priority
            />
          ) : (
            <DemoAvatar className="w-12 h-12" size={48 / 1.8} />
          )}
        </a>
      </Link>
      <div className={className.content}>
        <Link href={ROUTES.authorProfile(author.id)} passHref>
          <a aria-label={userName} className={className.title}>
            {userName}
          </a>
        </Link>
        <time className={className.timeBox}>{postDate}</time>
      </div>
    </section>
  );
}
