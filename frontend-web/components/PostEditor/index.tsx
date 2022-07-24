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

import Element from "./Element";
import Leaf from "./Leaf";
import Toolbar from "./Toolbar";

const className = { root: "border rounded-md" };

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function PostEditor() {
  const [value, setValue] = useState(initialValue);
  const [editor] = useState(() =>
    withHistory(withReact(createEditor() as ReactEditor))
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const onChange = (value: Descendant[]) => {
    setValue(value);
  };

  //   console.log(value);

  return (
    <section className={className.root}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar />
        <section className="px-4 py-2 overflow-x-auto">
          <Editable
            placeholder="Post body"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </section>
      </Slate>
    </section>
  );
}
