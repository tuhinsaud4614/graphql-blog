import { UserLink } from "components";

const className = {
  item: "mb-3 last:mb-0",
};

interface Props {
  children: string;
  link: string;
  src: string;
}

export default function ResultItem({ children, link, src }: Props) {
  return (
    <li className={className.item}>
      <UserLink href={link} src={src}>
        {children}
      </UserLink>
    </li>
  );
}
