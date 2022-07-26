import { SlateElement, SlateLeaf } from "@component";
import { useCallback, useState } from "react";
import { createEditor, Descendant } from "slate";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { withEmbeds, withImages } from "utils";

interface Props {
  value: Descendant[];
}

export default function SlateViewer({ value }: Props) {
  const [editor] = useState(() =>
    withEmbeds(withImages(withReact(createEditor() as ReactEditor)))
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    []
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
