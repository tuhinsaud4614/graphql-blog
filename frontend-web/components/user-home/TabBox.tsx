import { PostItem } from "components";
import { ReactNode } from "react";
import PostItems from "./PostItems";

const className = {
  root: "pt-3",
  item: "border-b last:border-none py-5",
};

const isTrue = false;

interface Props {
  notFound?: ReactNode;
  children?: ReactNode;
}

export default function TabBox({ children, notFound }: Props) {
  if (notFound) {
    return <section className="pt-3">{notFound}</section>;
  }
  return (
    <PostItems>
      {Array.from({ length: 10 }).map((_, index) => (
        <PostItem key={index} classes={{ root: className.item }} />
      ))}
    </PostItems>
  );
}
