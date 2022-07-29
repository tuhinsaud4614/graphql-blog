import { Button, SlateElement, SlateLeaf } from "components";
import pipe from "lodash/fp/pipe";
import dynamic from "next/dynamic";
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

const HoveringToolbar = dynamic(() => import("./HoveringToolbar"), {
  ssr: false,
});

const className = {
  root: "mt-10 pb-10 border-b dark:border-base-dark-300",
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
          variant="neutral"
          className="min-w-[5rem]"
          outline
        >
          Cancel
        </Button>
        <Button
          aria-label="Save"
          type="button"
          onClick={() => {}}
          className="ml-3 min-w-[5rem]"
        >
          Save
        </Button>
      </div>
      <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
        <HoveringToolbar />
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
