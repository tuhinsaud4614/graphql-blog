import { BaseText } from "slate";
import { RenderLeafProps } from "slate-react";

interface LeafProps extends BaseText {
  [key: string]: string;
}

export default function SlateLeaf({
  attributes,
  children,
  leaf,
}: RenderLeafProps) {
  const newLeaf = leaf as LeafProps;

  if (newLeaf.bold) {
    children = (
      <strong {...attributes} className="text-neutral dark:text-neutral-dark">
        {children}
      </strong>
    );
  }

  if (newLeaf.italic) {
    children = (
      <em {...attributes} className="text-neutral dark:text-neutral-dark">
        {children}
      </em>
    );
  }

  if (newLeaf.underline) {
    children = (
      <u {...attributes} className="text-neutral dark:text-neutral-dark">
        {children}
      </u>
    );
  }

  return (
    <span {...attributes} className="text-neutral dark:text-neutral-dark">
      {children}
    </span>
  );
}
