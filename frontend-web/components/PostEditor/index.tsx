import * as React from "react";

import pipe from "lodash/fp/pipe";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { SlateElement, SlateLeaf } from "@/components";
import {
  setLocalStorageValue,
  withEmbeds,
  withImages,
  withLinks,
} from "@/utils";
import { CREATE_POST_KEY } from "@/utils/constants";

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
  const [editor] = React.useState(() =>
    withPlugins(createEditor() as ReactEditor),
  );

  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    [],
  );

  const renderElement = React.useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    [],
  );

  return (
    <section className={className.root}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op: any) => "set_selection" !== op.type,
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
        <section className="min-h-[12rem] overflow-x-auto px-4 py-2">
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
