import { CommentBox } from "components";
import { useState } from "react";
import { Descendant } from "slate";
import { commentSerialize } from "utils";

interface Props {
  onHide?(): void;
  parentId: string;
}

export default function ReplyEditor({ onHide, parentId }: Props) {
  const [value, setValue] = useState<Descendant[]>([
    {
      children: [{ text: "" }],
    },
  ]);
  console.log("value", value);
  console.log("serialize", commentSerialize({ children: value }));
  return (
    <CommentBox
      value={value}
      onChange={(v) => setValue(v)}
      classes={{ root: "w-[20rem] mt-1" }}
      expanded
      onCancel={onHide}
    />
  );
}
