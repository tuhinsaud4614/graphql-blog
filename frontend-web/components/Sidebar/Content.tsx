import classNames from "classnames";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

const className = {
  title: "text-neutral mb-[1.375rem] font-medium",
  items: "list-none m-0",
  more: "flex items-center text-xs w-full mt-3",
  moreLink: "text-success hover:text-success-focus active:scale-95",
};

interface Props {
  title?: string;
  moreLink?: string;
  moreText?: string;
  children?: ReactNode;
  classes?: {
    title?: string;
    items?: string;
    more?: string;
    moreLink?: string;
  };
}

export default function Content({
  title = "Categories",
  moreLink,
  moreText,
  children,
  classes,
}: Props) {
  return (
    <Fragment>
      <p className={classNames(className.title, classes?.title)}>{title}</p>
      <ul className={classNames(className.items, classes?.items)}>
        {children}
        {moreLink && moreText && (
          <li className={classNames(className.more, classes?.more)}>
            <Link href={moreLink} passHref>
              <a
                aria-label={moreText}
                className={classNames(className.moreLink, classes?.moreLink)}
              >
                {moreText}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </Fragment>
  );
}
