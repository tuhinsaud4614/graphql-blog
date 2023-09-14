import { GetServerSideProps } from "next";

import { NetworkStatus } from "@apollo/client";

import { ErrorBox } from "@/components";
import { AdminLayout } from "@/components/Layout";
import { AdminCreateCategory } from "@/components/admin-categories";
import AdminCategories from "@/components/admin-categories/List";
import {
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  useGetCategoriesWithOffsetQuery,
} from "@/graphql/generated/schema";
import { addApolloState, initializeApollo } from "@/lib/apollo";
import { gplErrorHandler, isDev } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { withSSRAuth } from "@/utils/ssr";

export default function Categories() {
  const { data, refetch, error, loading, networkStatus } =
    useGetCategoriesWithOffsetQuery({
      variables: { limit: 10, page: 10 },
      notifyOnNetworkStatusChange: true,
    });

  if (loading || networkStatus === NetworkStatus.refetch) {
    return <AdminLayout>Loading</AdminLayout>;
  }

  if (error) {
    return (
      <AdminLayout>
        <ErrorBox
          title="Fetching categories errors"
          errors={gplErrorHandler(error)}
          onRetry={refetch}
        />
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <AdminCategories categories={data?.categoriesWithOffset.data || []}>
        <AdminCreateCategory />
      </AdminCategories>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  ROUTES.login,
  async (_, { query }, accessToken) => {
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
