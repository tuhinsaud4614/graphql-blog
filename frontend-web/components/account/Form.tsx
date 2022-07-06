import Link from "next/link";
import { ComponentPropsWithoutRef, Fragment } from "react";

const className = {
  form: "mt-8 w-full",
  linkText: "my-3 flex items-center justify-center text-neutral",
  link: "ml-2 text-success hover:text-success-content active:scale-95",
};

interface Props extends ComponentPropsWithoutRef<"form"> {
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
    <Fragment>
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
    </Fragment>
  );
}
