import { ROUTES } from "@constants";
import { selectUser } from "@features";
import classNames from "classnames";
import { ClientOnly, DemoAvatar } from "components";
import { FUserFragment } from "graphql/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "store";
import { generateFileUrl, getUserName } from "utils";
import OtherInfo from "./OtherInfo";

const className = {
  root: "flex flex-col items-start",
  img: "w-[5.5rem] h-[5.5rem] inline-block rounded-full overflow-hidden border-2 dark:border-none dark:ring-1 dark:ring-secondary-dark p-1",
  name: "text-neutral dark:text-neutral-dark hover:text-neutral-focus dark:hover:text-neutral-dark-focus font-medium mt-4 active:scale-95",
  editLink:
    "mt-6 text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark-focus active:scale-95",
};

interface Props {
  classes?: {
    root?: string;
    img?: string;
  };
  user: FUserFragment;
}

export default function UserProfiler({ classes, user }: Props) {
  const rdxUser = useAppSelector(selectUser);
  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <div className={classNames(className.root, classes?.root)}>
      {imgUrl ? (
        <span className={classNames(className.img, classes?.img)}>
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={userName}
            width={88}
            height={88}
            layout="responsive"
            objectFit="cover"
            className="rounded-full"
          />
        </span>
      ) : (
        <DemoAvatar className="w-[5.5rem] h-[5.5rem]" size={88 / 1.8} />
      )}
      <Link href={ROUTES.authorProfile(user.id)} passHref>
        <a aria-label={userName} className={className.name}>
          {userName}
        </a>
      </Link>

      <ClientOnly>
        {user && rdxUser && user.id === rdxUser.id ? (
          <Link href={ROUTES.accountSettings}>
            <a aria-label="Settings" className={className.editLink}>
              Edit profile
            </a>
          </Link>
        ) : (
          <OtherInfo user={user} authenticated={!!rdxUser} />
        )}
      </ClientOnly>
    </div>
  );
}
