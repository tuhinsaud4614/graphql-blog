import classNames from "classnames";
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
import { SlateVideoElement } from "utils/interfaces";

const className = {
  container: "pt-[75%] relative",
  inFrame: "absolute z-10 inset-0 block w-full h-full",
  btn: "absolute z-20 top-[0.5em] left-[0.5em] text-base-100 bg-error dark:bg-error-dark hover:bg-error-focus dark:hover:bg-error shadow-mui hover:shadow-mui-hover active:shadow-mui-active active:scale-95 flex items-center justify-center p-1 rounded-full",
};

export default function SlateEmbed({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const { url } = element as SlateVideoElement;
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);

  const selected = useSelected();
  const focused = useFocused();
  const isReadOnly = useReadOnly();

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div className={className.container}>
          <iframe src={url} frameBorder="0" className={className.inFrame} />
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
      {children}
    </div>
  );
}
