import { CommentBox, CommentBoxCommenter } from "components";
import { useState } from "react";
import { Descendant } from "slate";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function Comment() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  return (
    <CommentBox value={value} onChange={(value) => setValue(value)}>
      <CommentBoxCommenter />
    </CommentBox>
  );
}
