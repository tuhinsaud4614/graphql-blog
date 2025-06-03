import * as React from "react";

import Container from "./Container";

interface Props {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function SearchLayout({ children, sidebar }: Props) {
  return <Container sidebar={sidebar}>{children}</Container>;
}
