import * as React from "react";

import { User2 } from "lucide-react";

import AsComponent from "./AsComponent";

type Props = React.ComponentPropsWithRef<typeof AsComponent> & {
  size?: number;
};

export default function DemoAvatar({ size, ...rest }: Props) {
  return (
    <AsComponent {...rest}>
      <User2 size={size} />
    </AsComponent>
  );
}
