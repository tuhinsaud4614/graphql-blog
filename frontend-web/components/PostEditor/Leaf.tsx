import { RenderLeafProps } from "slate-react";

export default function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  // @ts-ignore
  if (leaf.bold) {
    children = <strong {...attributes}>{children}</strong>;
  }

  // @ts-ignore
  if (leaf.italic) {
    children = <em {...attributes}>{children}</em>;
  }

  // @ts-ignore
  if (leaf.underline) {
    children = <u {...attributes}>{children}</u>;
  }

  // @ts-ignore
  if (leaf.code) {
    children = <code {...attributes}>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
}
