import { Button, SlateElement, SlateLeaf } from "components";
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
import { withLinks } from "utils";

const className = {
  root: "mt-10 pb-10 border-b",
  actions: "flex items-center justify-end px-3",
};

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

const withPlugins = pipe([withReact, withHistory, withLinks]);

export default function AddAbout() {
  const [editor] = useState(() => withPlugins(createEditor() as ReactEditor));
  const [value, setValue] = useState(initialValue);

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
      <div className={className.actions}>
        <Button
          aria-label="Cancel"
          type="button"
          onClick={() => {}}
          outline
          disabled
          loading
        >
          Cancel
        </Button>
      </div>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <section className="px-4 py-2 overflow-x-auto">
          <Editable
            placeholder="Add bio"
            aria-label="Add bio"
            renderLeaf={renderLeaf}
            renderElement={renderElement}
          />
        </section>
      </Slate>
    </section>
  );
}
