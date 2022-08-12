import { ErrorBox, FollowItem, NoResultFound, Tag } from "components";
import {
  SidebarCategory,
  SidebarContent,
  SidebarSkeleton,
} from "components/Sidebar";
import { useGetCategoriesOnOffsetQuery } from "graphql/generated/schema";
import { Fragment, ReactNode } from "react";
import { gplErrorHandler, isDev } from "utils";
import { ROUTES } from "utils/constants";

import Container from "./Container";

interface Props {
  hideSidebar?: boolean;
  children: ReactNode;
}

const className = {
  divider: "w-full border-b dark:border-base-dark-300 my-4",
  link: "first:mt-3 first:ml-3 !rounded-full bg-neutral/5 dark:bg-neutral-dark/5 active:scale-95",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
};

export default function UserLayout({ hideSidebar = false, children }: Props) {
  return (
    <Container
      sidebar={
        hideSidebar ? null : (
          <Fragment>
            {/* <Skeleton />
          <div className="pt-5" />
          <Skeleton /> */}
            <Categories />
            <hr className={className.divider} />
            <SidebarContent
              title="Recommended tags"
              classes={{ items: className.items }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Tag
                  key={index}
                  href={ROUTES.postsByTag("New Tag" + (index + 1))}
                  className={className.link}
                >
                  New Tag - {index + 1}
                </Tag>
              ))}
            </SidebarContent>
            <hr className={className.divider} />
            <SidebarContent
              moreLink={ROUTES.mySuggestions}
              moreText="See more suggestions"
              title="Who to follow"
              classes={{ items: "pb-8" }}
            >
              <FollowItem />
              <FollowItem />
              <FollowItem />
              <FollowItem />
            </SidebarContent>
          </Fragment>
        )
      }
    >
      {children}
    </Container>
  );
}

function Categories() {
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
    return <NoResultFound>No category found for you</NoResultFound>;
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
      {data.categoriesOnOffset.data.map((category, index) => (
        <SidebarCategory
          key={category.id}
          title={category.title}
          link={ROUTES.postsByCategory(category.id)}
        />
      ))}
    </SidebarContent>
  );
}
