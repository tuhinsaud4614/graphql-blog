import * as React from "react";

import { Descendant, createEditor } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { SlateElement, SlateLeaf } from "@/components";

interface Props {
  value: Descendant[];
}

export default function SlateViewer({ value }: Props) {
  const [editor] = React.useState(() =>
    withReact(createEditor() as ReactEditor),
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
    <Slate editor={editor} value={value}>
      <Editable
        readOnly
        placeholder="Post content"
        aria-label="Post content"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
      />
    </Slate>
  );
}
