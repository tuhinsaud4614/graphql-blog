import { ReactNode } from "react";
import Container from "./Container";

interface Props {
  children?: ReactNode;
  sidebar?: ReactNode;
}

export default function SearchLayout({ children, sidebar }: Props) {
  return <Container sidebar={sidebar}>{children}</Container>;
}
