"use client";

import * as React from "react";

import { createEditor, Descendant } from "slate";
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import SlateElement from "./SlateElement";
import SlateLeaf from "./SlateLeaf";

interface Props {
  value: Descendant[];
  className?: string
}

export default function SlateViewer({ value,className }: Props) {
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
        className={className}
      />
    </Slate>
  );
}
