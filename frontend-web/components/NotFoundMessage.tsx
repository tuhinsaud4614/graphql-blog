import { LinkButton } from "components";

const className = {
  root: "py-[1.875rem] flex flex-col items-center",
  title:
    "text-neutral dark:text-neutral-dark text-sm font-normal text-center mb-6",
};

interface Props {
  goto: string;
  gotoText: string;
  title: string;
}

export default function NotFoundMessage({ goto, gotoText, title }: Props) {
  return (
    <div className={className.root}>
      <p className={className.title}>{title}</p>
      <LinkButton href={goto} passHref className="text-sm">
        {gotoText}
      </LinkButton>
    </div>
  );
}
