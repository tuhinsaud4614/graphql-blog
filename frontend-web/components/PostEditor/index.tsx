import { SlateElement, SlateLeaf } from "@component";
import { CREATE_POST_KEY } from "@constants";
import pipe from "lodash/fp/pipe";
import { useCallback, useState } from "react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { setLocalStorageValue, withEmbeds, withImages, withLinks } from "utils";

import Toolbar from "./Toolbar";

const className = { root: "border dark:border-base-dark-300 rounded-md" };

interface Props {
  value: Descendant[];
  onChange(value: Descendant[]): void;
}

const withPlugins = pipe([
  withReact,
  withHistory,
  withEmbeds,
  withImages,
  withLinks,
]);

export default function PostEditor({ onChange, value }: Props) {
  const [editor] = useState(() => withPlugins(createEditor() as ReactEditor));

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    []
  );

  return (
    <section className={className.root}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op: any) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            setLocalStorageValue(CREATE_POST_KEY, content);
          }
          onChange(value);
        }}
      >
        <Toolbar />
        <section className="px-4 py-2 overflow-x-auto min-h-[12rem]">
          <Editable
            placeholder="Post body"
            aria-label="Post body"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </section>
      </Slate>
    </section>
  );
}
