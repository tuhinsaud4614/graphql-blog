"use client";

import Link from "next/link";

const className = {
  root: "w-full mb-3 text-sm",
  link: "block text-neutral hover:text-accent active:scale-95",
};

interface Props {
  title: string;
  link: string;
}

export default function SidebarCategory({ title, link }: Props) {
  return (
    <li className={className.root}>
      <Link href={link} className={className.link} aria-label={title}>
        {title}
      </Link>
    </li>
  );
}
