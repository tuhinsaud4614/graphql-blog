import * as React from "react";

import Link from "next/link";

const className = {
  form: "mt-8 w-full overflow-x-hidden",
  linkText:
    "my-3 flex items-center justify-center text-neutral dark:text-neutral-dark",
  link: "ml-2 text-success dark:text-success-dark hover:text-success-focus dark:hover:text-success active:scale-95",
};

interface Props extends React.ComponentPropsWithoutRef<"form"> {
  changeText: string;
  changeLink: string;
  changeLinkText: string;
}

export default function Form({
  changeLink,
  changeLinkText,
  changeText,
  children,
  ...rest
}: Props) {
  return (
    <React.Fragment>
      <form {...rest} className={className.form}>
        {children}
        <div className={className.linkText}>
          {changeText}
          <Link href={changeLink} passHref>
            <a aria-label={changeLinkText} className={className.link}>
              {changeLinkText}
            </a>
          </Link>
        </div>
      </form>
    </React.Fragment>
  );
}
