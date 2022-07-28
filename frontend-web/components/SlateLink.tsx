import { BiUnlink } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import {
  RenderElementProps,
  useFocused,
  useReadOnly,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { unwrapLink } from "utils";

const className = {
  popup:
    "absolute z-10 left-0 flex items-center py-1.5 px-2.5 border rounded-md",
  popupLink:
    "flex items-center text-primary dark:text-primary-dark hover:text-primary-focus dark:hover:text-primary text-sm border-r pr-2.5 cursor-pointer select-none",
  unlink:
    "select-none ml-2.5 text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark active:scale-95",
};

const InlineChromiumBugfix = () => (
  <span contentEditable={false} className="text-[0]">
    ${String.fromCodePoint(160)}
  </span>
);

export default function SlateLink({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const editor = useSlateStatic();
  const isReadOnly = useReadOnly();
  const selected = useSelected();
  const focused = useFocused();
  const extra = isReadOnly ? { rel: "noreferrer", target: "_blank" } : {};
  return (
    <div className="relative inline">
      <a
        {...attributes}
        //   @ts-ignore
        href={element.url}
        className="underline text-neutral dark:text-neutral-dark"
        {...extra}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
      {!isReadOnly && selected && focused && (
        <div className={className.popup} contentEditable={false}>
          <a
            rel="noreferrer"
            target="_blank"
            // @ts-ignore
            href={element.url}
            className={className.popupLink}
          >
            <FiExternalLink size={18} />
            {/* @ts-ignore */}
            <span className="ml-1.5">{element.url}</span>
          </a>
          <button
            aria-label="remove"
            type="button"
            className={className.unlink}
            onClick={() => unwrapLink(editor)}
          >
            <BiUnlink size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
