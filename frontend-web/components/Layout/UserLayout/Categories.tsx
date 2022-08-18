import { ErrorBox } from "components";
import {
  SidebarCategory,
  SidebarContent,
  SidebarSkeleton,
} from "components/Sidebar";
import { useGetCategoriesOnOffsetQuery } from "graphql/generated/schema";
import { gplErrorHandler, isDev } from "utils";
import { ROUTES } from "utils/constants";

export default function Categories() {
  const { data, loading, refetch, error } = useGetCategoriesOnOffsetQuery({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    variables: { limit: 6, page: 1 },
  });

  if (loading) {
    return <SidebarSkeleton />;
  }
  if (error) {
    return (
      <ErrorBox
        title="Fetching categories errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
          title: "text-base",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.log("Fetching categories errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.categoriesOnOffset.data.length === 0) {
    return null;
  }

  return (
    <SidebarContent
      title="Categories"
      moreLink={ROUTES.categories}
      moreText={
        data.categoriesOnOffset.pageInfo?.hasNext
          ? "See all the categories"
          : undefined
      }
    >
      {data.categoriesOnOffset.data.map((category) => (
        <SidebarCategory
          key={category.id}
          title={category.title}
          link={ROUTES.postsByCategory(category.id)}
        />
      ))}
    </SidebarContent>
  );
}
