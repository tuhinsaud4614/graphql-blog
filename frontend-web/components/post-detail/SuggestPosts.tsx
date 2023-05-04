import { ErrorBox } from "@/components";
import {
  SidebarContent,
  SidebarPostItem,
  SidebarPostItemSkeleton,
} from "@/components/Sidebar";
import { useGetPostsWithOffsetQuery } from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";

const className = {
  skeleton: "flex flex-col space-y-4",
};

interface Props {
  currentId: string;
}

function SuggestPosts({ currentId }: Props) {
  const { data, loading, error, refetch } = useGetPostsWithOffsetQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4 },
  });

  if (loading) {
    return (
      <div className={className.skeleton}>
        <SidebarPostItemSkeleton />
        <SidebarPostItemSkeleton />
        <SidebarPostItemSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching more errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
          title: "text-base",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.log("Fetching authors errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.postsOnOffset.data.length === 0) {
    return null;
  }

  const posts = data.postsOnOffset.data;
  const newPosts = posts.filter((post) => post.id !== currentId);

  if (newPosts.length === 0) {
    return null;
  }

  return (
    <SidebarContent
      title="More from The RAT Diary"
      classes={{ items: "space-y-4 pb-8" }}
    >
      {newPosts.map((post) => (
        <SidebarPostItem key={post.id} post={post} />
      ))}
    </SidebarContent>
  );
}

export default SuggestPosts;
