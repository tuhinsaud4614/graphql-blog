import { RenderElementProps } from "slate-react";
import SlateEmbed from "./SlateEmbed";
import SlateImage from "./SlateImage";
import SlateLink from "./SlateLink";

export default function SlateElement({
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
          className="border-l-2 dark:border-base-dark-300 pl-2.5 italic text-neutral/60 dark:text-neutral-dark/60"
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
        <h1
          style={style}
          className="text-3xl font-bold text-neutral dark:text-neutral-dark"
          {...attributes}
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          style={style}
          className="text-2xl font-bold text-neutral dark:text-neutral-dark"
          {...attributes}
        >
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li
          style={style}
          className="text-neutral dark:text-neutral-dark"
          {...attributes}
        >
          {children}
        </li>
      );
    case "code":
      return (
        <pre
          {...attributes}
          style={style}
          className="block text-base font-[monospace] bg-base-200 dark:bg-base-dark-300 text-[#292929] p-[0.1875rem] w-full whitespace-pre-wrap"
        >
          <code className="text-[#292929]">{children}</code>
        </pre>
      );
    case "image":
      return (
        <SlateImage attributes={attributes} element={element}>
          {children}
        </SlateImage>
      );
    case "video":
      return (
        <SlateEmbed attributes={attributes} element={element}>
          {children}
        </SlateEmbed>
      );
    case "link":
      return (
        <SlateLink attributes={attributes} element={element}>
          {children}
        </SlateLink>
      );

    default:
      return (
        <div
          {...attributes}
          style={style}
          className="text-neutral dark:text-neutral-dark"
        >
          {children}
        </div>
      );
  }
}
