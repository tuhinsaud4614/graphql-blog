import ErrorBox from "@/components/ErrorBox";
import NoResultFound from "@/components/NoResultFound";
import {
  GetTrendingPostsDocument,
  GetTrendingPostsQuery,
} from "@/graphql/generated/schema";
import { getClient } from "@/lib/apolloClient";
import { gplErrorHandler } from "@/lib/utils";

import TrendingItem from "./Item";

export default async function TrendingList() {
  const { data, error } = await getClient().query<GetTrendingPostsQuery>({
    query: GetTrendingPostsDocument,
  });

  if (error) {
    return (
      <ErrorBox title="Trends posts errors" errors={gplErrorHandler(error)} />
    );
  }

  if (!data || !data.trendingPosts || data.trendingPosts.length === 0) {
    return (
      <NoResultFound
        classes={{
          root: "!items-start",
          title: "text-lg selection:bg-neutral selection:text-base-100",
        }}
      >
        No trending posts for you
      </NoResultFound>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-wrap">
      {data?.trendingPosts.map((post, index) => (
        <TrendingItem post={post} key={post.id} index={index + 1} />
      ))}
    </ul>
  );
}
