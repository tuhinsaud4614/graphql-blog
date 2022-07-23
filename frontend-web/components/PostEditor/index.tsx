import { useCallback, useState } from "react";
import { createEditor, Descendant, Node, NodeEntry } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { decorateCode } from "./CodeHighlight";
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
  const [language, setLanguage] = useState("html");
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

  const decorate = useCallback(
    (entry: NodeEntry<Node>) => decorateCode(entry, language),
    [language]
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
            decorate={decorate}
            placeholder="Post body"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            className="w-full"
          />
        </section>
      </Slate>
    </section>
  );
}
