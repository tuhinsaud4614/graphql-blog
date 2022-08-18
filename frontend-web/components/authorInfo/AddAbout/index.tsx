import { Button, ErrorModal, SlateElement, SlateLeaf } from "components";
import { updateUserAbout } from "features/auth/authSlice";
import { useUpdateAboutMutation } from "graphql/generated/schema";
import pipe from "lodash/fp/pipe";
import dynamic from "next/dynamic";
import { Fragment, useCallback, useState } from "react";
import { toast } from "react-toastify";
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
import { useAppDispatch } from "store";
import { gplErrorHandler, withLinks } from "utils";

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

interface Props {
  previousValue: Descendant[] | null;
}

export default function AddAbout({ previousValue }: Props) {
  const [editor] = useState(() => withPlugins(createEditor() as ReactEditor));
  const [value, setValue] = useState(previousValue || initialValue);
  const [editMode, setEditMode] = useState(false);

  const rdxDispatch = useAppDispatch();

  const [updateABout, { loading, error, reset }] = useUpdateAboutMutation({
    notifyOnNetworkStatusChange: true,
  });

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    []
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    []
  );

  const onSubmit = async () => {
    try {
      const { data } = await updateABout({
        variables: { value: JSON.stringify(value) },
      });
      if (data && data.updateAbout) {
        const newAbout = data.updateAbout;
        rdxDispatch(updateUserAbout(newAbout));
        setEditMode(false);
        toast.success("User about update successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <section className={className.root}>
        <div className={className.actions}>
          {!editMode ? (
            <Button
              aria-label="Edit"
              type="button"
              onClick={() => setEditMode(true)}
              className="min-w-[5rem]"
              mode="text"
            >
              Edit
            </Button>
          ) : (
            <Fragment>
              <Button
                aria-label="Cancel"
                type="button"
                onClick={() => setEditMode(false)}
                variant="neutral"
                className="min-w-[5rem]"
                mode="outline"
              >
                Cancel
              </Button>
              <Button
                aria-label="Save"
                type="button"
                onClick={onSubmit}
                className="ml-3 min-w-[5rem]"
                disabled={loading}
                loading={loading}
              >
                Save
              </Button>
            </Fragment>
          )}
        </div>
        <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
          <HoveringToolbar />
          <section className="px-4 py-2 overflow-x-auto">
            <Editable
              readOnly={!editMode}
              placeholder="Add bio"
              aria-label="Add bio"
              renderLeaf={renderLeaf}
              renderElement={renderElement}
              // onChange={(value) => {
              //   const isAstChange = editor.operations.some(
              //     (op: any) => "set_selection" !== op.type
              //   );
              //   if (isAstChange) {
              //     // Save the value to Local Storage.
              //     const content = JSON.stringify(value);
              //     setLocalStorageValue(ABOUT_ME_KEY, content);
              //   }
              // }}
            />
          </section>
        </Slate>
      </section>
      <ErrorModal
        onClose={() => reset()}
        title="User about update error"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
}
