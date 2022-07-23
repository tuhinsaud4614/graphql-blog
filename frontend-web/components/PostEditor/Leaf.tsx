import { BaseText } from "slate";
import { RenderLeafProps } from "slate-react";
import Code from "./CodeHighlight";

interface LeafProps extends BaseText {
  [key: string]: string;
}

export default function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  const newLeaf = leaf as LeafProps;

  if (newLeaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  if (newLeaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  if (newLeaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  if (newLeaf.code) {
    children = (
      <Code attributes={attributes} leaf={leaf}>
        {children}
      </Code>
    );
  }

  return <span {...attributes}>{children}</span>;
}
