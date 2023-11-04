"use client";

import UserLink from "@/components/UserLink";

interface Props {
  children: string;
  link: string;
  src: string;
}

export default function SearchResultItem({ children, link, src }: Props) {
  return (
    <li className="mb-3 last:mb-0">
      <UserLink href={link} src={src} text={children} />
    </li>
  );
}
