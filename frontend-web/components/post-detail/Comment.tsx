import { CommentBox, CommentBoxCommenter } from "components";
import { Fragment, useState } from "react";
import { Descendant } from "slate";
import CommentItem from "./CommentItem";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function Comment() {
  const [value, setValue] = useState<Descendant[]>(initialValue);

  console.log(value);

  return (
    <Fragment>
      <CommentBox value={value} onChange={(v) => setValue(v)}>
        <CommentBoxCommenter />
      </CommentBox>
      <CommentItem body={JSON.stringify(value)} />
    </Fragment>
  );
}
