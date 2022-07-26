import { SlateElement, SlateLeaf } from "@component";
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
import { withEmbeds, withImages, withLinks } from "utils";

import Toolbar from "./Toolbar";

const className = { root: "border rounded-md" };

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

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
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar />
        <section className="px-4 py-2 overflow-x-auto">
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
