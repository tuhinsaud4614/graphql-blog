import { useState } from "react";
import { Descendant } from "slate";

import { CommentBox, CommentBoxCommenter } from "components";
import { commentSerialize } from "utils";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

interface Props {
  userInfo?: string;
  commentBoxClassName?: string;
  onHide?(): void;
  expanded?: boolean;
}

export default function CommentEditor({
  userInfo,
  commentBoxClassName,
  onHide,
  expanded,
}: Props) {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  console.log("value", value);
  console.log("serialize", commentSerialize({ children: value }));
  return (
    <CommentBox
      value={value}
      onChange={(v) => setValue(v)}
      classes={{ root: commentBoxClassName }}
      expanded={expanded}
      onCancel={onHide}
    >
      {userInfo && <CommentBoxCommenter />}
    </CommentBox>
  );
}
