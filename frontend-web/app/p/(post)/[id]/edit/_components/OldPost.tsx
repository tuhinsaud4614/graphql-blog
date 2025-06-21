"use client";

import { ErrorBox } from "@/components";
import { useGetPostWithAuthorIdQuery } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { gplErrorHandler } from "@/lib/utils";

import PostForm from "../../../_components/post-form";
import NotFoundPost from "../../_components/NotFoundPost";
import NewPostSkeleton from "./Skeleton";

interface Props {
  id: string;
}

export default function OldPost({ id }: Readonly<Props>) {
  const user = useUser();
  const { data, loading, error, refetch } = useGetPostWithAuthorIdQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id },
  });

  if (loading) {
    return <NewPostSkeleton />;
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

  if (!data || !data.post || !user || user.id !== data.post.author.id) {
    return <NotFoundPost />;
  }

  return <PostForm post={data?.post} />;
}
