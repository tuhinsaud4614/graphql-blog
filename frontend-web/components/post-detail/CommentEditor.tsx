import escapeHtml from "escape-html";
import { useState } from "react";
import { Descendant, Text } from "slate";

import { CommentBox, CommentBoxCommenter } from "components";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

const serialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    // @ts-ignore
    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    return string;
  }

  //   @ts-ignore
  const children = node.children.map((n) => serialize(n)).join("");
  return children;
};

interface Props {
  userInfo?: string;
  commentBoxClassName?: string;
  onHide?(): void;
  expanded?: boolean;
}

export default function Comment({
  userInfo,
  commentBoxClassName,
  onHide,
  expanded,
}: Props) {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  console.log("value", value);
  console.log("serialize", serialize({ children: value }));
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
