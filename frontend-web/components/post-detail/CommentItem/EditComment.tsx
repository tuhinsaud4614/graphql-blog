import * as React from "react";

import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { Descendant } from "slate";

import { CommentBox, ToastErrorMessage } from "@/components";
import { useUpdateCommentMutation } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

import { useEditorCloser } from "./context";

// commentSerialize

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
  const {
    query: { postId },
  } = useRouter();
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
            commentId: commentId,
          },
        },
      });
      setValue(initialValue);
      setExpand(false);
      closer();
    } catch (error) {}
  };

  React.useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
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
