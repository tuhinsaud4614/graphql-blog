"use client";

import * as React from "react";



import { Descendant } from "slate";

import { CommentBox, ToastErrorMessage } from "@/components";
import { useUpdateCommentMutation } from "@/graphql/generated/schema";

import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";
import { toast } from "sonner";
import { useEditorCloser } from "./context";

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

interface Props {
  oldValue: Descendant[];
  commentId: string;
}

export default function EditComment({
  oldValue = initialValue,
  commentId,
}: Props) {

  const [value, setValue] = React.useState<Descendant[]>(oldValue);
  const [expand, setExpand] = React.useState(true);
  const closer = useEditorCloser();

  const [updateComment, { loading, error }] = useUpdateCommentMutation({
    notifyOnNetworkStatusChange: true,
  });

  const submitHandler = async () => {
    try {
      await updateComment({
        variables: {
          data: {
            content: JSON.stringify(value),
            id: commentId,
          },
        },
      });
      setValue(initialValue);
      setExpand(false);
      closer();
    } catch (error) {
      isDev() && console.error(error)
    }
  };

  React.useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
      });
    }
  }, [error]);

  return (
    <CommentBox
      value={value}
      onChange={(v) => setValue(v)}
      submitBtnText="Update"
      classes={{ root: "!m-0" }}
      expanded={expand}
      onExpanded={(isExpanded) => {
        if (!isExpanded) {
          closer();
        }
        setExpand(isExpanded);
      }}
      onSubmit={submitHandler}
      disabled={
        loading || JSON.stringify(value) === JSON.stringify(initialValue)
      }
      loader={loading}
    />
  );
}
