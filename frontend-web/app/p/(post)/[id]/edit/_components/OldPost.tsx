"use client";

import { ErrorBox, NoResultFound } from "@/components";
import { useGetPostWithAuthorIdQuery } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import PostForm from "../../../_components/post-form";

interface Props {
  id: string;
}

export default function OldPost({ id }: Readonly<Props>) {
  const { data, loading, error, refetch } = useGetPostWithAuthorIdQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <ErrorBox
        title="Post not found"
        errors={gplErrorHandler(error)}
        onRetry={async () => {
          await refetch();
        }}
      />
    );
  }

  if (!data || !data.post) {
    return (
      <NoResultFound
        classes={{
          root: "!items-start",
          title: "text-lg selection:bg-neutral selection:text-base-100",
        }}
      >
        No post for you
      </NoResultFound>
    );
  }

  return <PostForm post={data?.post} />;
}
