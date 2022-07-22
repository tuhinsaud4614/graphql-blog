import { RenderElementProps } from "slate-react";

export default function Element({
  attributes,
  children,
  element,
}: RenderElementProps) {
  // console.log(element);

  // @ts-ignore
  const style = { textAlign: element.align };
  // @ts-ignore
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} className="text-3xl font-bold" {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} className="text-2xl font-bold" {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}
