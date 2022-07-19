import { CommentBox } from "components";
import { useState } from "react";
import { Descendant } from "slate";
import { commentSerialize } from "utils";
import { useEditorCloser } from "./context";
// commentSerialize

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function EditComment() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const closer = useEditorCloser();
  console.log("value", value);
  console.log("serialize", commentSerialize({ children: value }));
  return (
    <CommentBox
      value={value}
      onChange={(v) => setValue(v)}
      onCancel={closer}
      submitBtnText="Update"
      classes={{ root: "!m-0" }}
      expanded
    />
  );
}
