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
          className="border-l-2 pl-2.5 italic text-[#aaa]"
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

    case "code-block":
      return (
        <pre
          style={style}
          className={
            "font-[monospace] bg-[#282a36] p-[0.1875rem] shadow-[0_1px_rgba(0,_0,_0,_0.3)] w-full whitespace-pre-wrap"
          }
          {...attributes}
        >
          {children}
        </pre>
      );

    default:
      return (
        <div style={style} {...attributes}>
          {children}
        </div>
      );
  }
}
