import { NotFoundMessage, TabBox } from "components";
import { ReactNode } from "react";

interface Props {
  link: string;
  linkText: string;
  title: string;
  children?: ReactNode;
}

export default function TabContainer({
  link,
  linkText,
  title,
  children,
}: Props) {
  return (
    <TabBox
      notFound={
        !children && (
          <NotFoundMessage title={title} goto={link} gotoText={linkText} />
        )
      }
    >
      {children}
    </TabBox>
  );
}
