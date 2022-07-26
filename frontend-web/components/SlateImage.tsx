import classNames from "classnames";
import NextImage from "next/image";
import { BiTrash } from "react-icons/bi";
import { Transforms } from "slate";
import {
  ReactEditor,
  RenderElementProps,
  useFocused,
  useReadOnly,
  useSelected,
  useSlateStatic,
} from "slate-react";

const className = {
  container: "relative pt-[56.25%] w-full",
  imgWrapper: "absolute z-10 inset-0 overflow-hidden",
  btn: "absolute z-20 top-[0.5em] left-[0.5em] text-base-100 bg-error hover:bg-error-focus shadow-mui hover:shadow-mui-hover active:shadow-mui-active active:scale-95 flex items-center justify-center p-1 rounded-full",
};

export default function SlateImage({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor as ReactEditor, element);

  const selected = useSelected();
  const focused = useFocused();
  const isReadOnly = useReadOnly();
  return (
    <div {...attributes}>
      {children}
      <div contentEditable={false} className={className.container}>
        <div
          className={classNames(
            className.imgWrapper,
            !isReadOnly && selected && focused && "shadow-mui"
          )}
        >
          <NextImage
            //   @ts-ignore
            loader={() => element.url}
            //   @ts-ignore
            src={element.url}
            unoptimized={true}
            alt="Inserted image"
            layout="fill"
            priority
          />
        </div>
        {!isReadOnly && (
          <button
            aria-label="Remove image"
            onClick={() => Transforms.removeNodes(editor, { at: path })}
            className={classNames(
              className.btn,
              selected && focused ? "inline" : "none"
            )}
          >
            <BiTrash size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
