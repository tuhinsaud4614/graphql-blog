import { GetServerSideProps } from "next";

import { NetworkStatus } from "@apollo/client";

import { AuthGuard, ErrorBox } from "@/components";
import { AdminLayout } from "@/components/Layout";
import { AdminCreateCategory } from "@/components/admin-categories";
import AdminCategories from "@/components/admin-categories/List";
import AdminCategorySkeleton from "@/components/admin-categories/Skeleton";
import {
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  UserRole,
  useGetCategoriesWithOffsetQuery,
} from "@/graphql/generated/schema";
import { addApolloState, initializeApollo } from "@/lib/apollo";
import { convertDateToLocale, gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { withSSRAuth } from "@/utils/ssr";

export default function Categories() {
  const { data, refetch, error, loading, networkStatus } =
    useGetCategoriesWithOffsetQuery({
      variables: { limit: 10, page: 1 },
      notifyOnNetworkStatusChange: true,
    });

  let content = (
    <AdminCategories
      categories={
        data?.categoriesWithOffset.data.map((category) => ({
          ...category,
          updatedAt: convertDateToLocale(category.updatedAt),
        })) || []
      }
    >
      <AdminCreateCategory />
    </AdminCategories>
  );

  if (loading || networkStatus === NetworkStatus.refetch) {
    content = <AdminCategorySkeleton />;
  } else if (error) {
    content = (
      <ErrorBox
        title="Fetching categories errors"
        errors={gplErrorHandler(error)}
        onRetry={refetch}
      />
    );
  }
  return (
    <AuthGuard role={UserRole.Admin}>
      <AdminLayout>{content}</AdminLayout>
    </AuthGuard>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  ROUTES.login,
  async (_, __, accessToken) => {
    const client = initializeApollo(undefined, accessToken);

    try {
      await client.query<
        GetCategoriesWithOffsetQuery,
        GetCategoriesWithOffsetQueryVariables
      >({
        query: GetCategoriesWithOffsetDocument,
        variables: { limit: 10, page: 1 },
        errorPolicy: "all",
      });

      return addApolloState(client, { props: {} });
    } catch (error) {
      isDev() && console.log(error);
      return addApolloState(client, { props: {} });
    }
  },
);
