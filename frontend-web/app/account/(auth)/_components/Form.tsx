import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"form"> {
  changeText: string;
  changeLink: string;
  changeLinkText: string;
  title: string;
}

export default function AccountForm({
  changeLink,
  changeLinkText,
  changeText,
  className,
  children,
  title,
  ...rest
}: Props) {
  return (
    <>
      <h2 className="line-clamp-1 text-ellipsis font-title text-[1.5rem] font-semibold leading-8 tracking-[-0.03em] text-secondary selection:bg-secondary selection:text-base-100">
        {title}
      </h2>
      <form
        {...rest}
        className={cn("mt-8 w-full overflow-x-hidden", className)}
      >
        {children}
        <div className="my-3 flex items-center justify-center text-neutral selection:bg-neutral selection:text-base-100">
          {changeText}
          <Link
            aria-label={changeLinkText}
            className="ml-2 text-success hover:text-success-focus active:scale-95 dark:hover:text-success"
            href={changeLink}
          >
            {changeLinkText}
          </Link>
        </div>
      </form>
    </>
  );
}
