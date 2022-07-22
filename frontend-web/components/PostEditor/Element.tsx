import { RenderElementProps } from "slate-react";

export default function Element({
  attributes,
  children,
  element,
}: RenderElementProps) {
  // @ts-ignore
  const style = { textAlign: element.align };
  // @ts-ignore
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={style}
          className="border-l-2 pl-2.5 italic"
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={style}
          className="list-disc block pl-10 my-4"
          {...attributes}
        >
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol
          style={style}
          className="list-decimal block pl-10 my-4"
          {...attributes}
        >
          {children}
        </ol>
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

    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}
