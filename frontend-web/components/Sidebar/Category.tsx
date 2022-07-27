import Link from "next/link";

const className = {
  root: "w-full mb-3 text-sm",
  link: "block text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark active:scale-95",
};

interface Props {
  title: string;
  link: string;
}

export default function Category({ title, link }: Props) {
  return (
    <li className={className.root}>
      <Link href={link} passHref>
        <a className={className.link} aria-label={title}>
          {title}
        </a>
      </Link>
    </li>
  );
}
