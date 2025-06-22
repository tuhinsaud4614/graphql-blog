"use client";

import * as React from "react";

import { NetworkStatus } from "@apollo/client";
import _uniqBy from "lodash/uniqBy";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Navigation, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { ErrorBox } from "@/components";
import { useGetAuthorFollowingsWithCursorQuery } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { isDev } from "@/lib/isType";
import { cn, gplErrorHandler } from "@/lib/utils";

import FollowItem from "./Item";
import FollowLoadMore from "./LoadMore";
import FollowSkeleton from "./Skelton";

const className = {
  navBtn:
    "h-full absolute top-2/4 -translate-y-1/2 z-10 flex items-center justify-center text-neutral dark:text-neutral-dark",
};

const PrevButton = (props: React.ComponentPropsWithoutRef<"button">) => {
  const swiper = useSwiper();

  return (
    <button
      {...props}
      onClick={() => {
        swiper.slidePrev();
      }}
      className={cn(
        className.navBtn,
        "dark:bg-base-dark-right left-0 bg-base-right pr-5",
        props.className,
      )}
    >
      <ChevronLeftIcon size={34} />
    </button>
  );
};

const NextButton = ({
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  const swiper = useSwiper();
  return (
    <button
      {...props}
      onClick={(e) => {
        swiper.slideNext();
        onClick?.(e);
      }}
      className={cn(
        className.navBtn,
        "dark:bg-base-dark-left right-0 bg-base-left pl-5",
        props.className,
      )}
    >
      <ChevronRightIcon size={34} />
    </button>
  );
};

export default function FollowList() {
  const user = useUser();
  const { data, error, networkStatus, refetch, fetchMore } =
    useGetAuthorFollowingsWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      variables: { limit: 10 },
    });

  const prevId = "prev-btn";
  const nextId = "next-btn";

  if (!user) {
    return null;
  }

  if (
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.refetch
  ) {
    return <FollowSkeleton />;
  }

  if (error) {
    return (
      <ErrorBox
        title="Fetching followers errors"
        errors={gplErrorHandler(error)}
        classes={{
          root: "mt-6",
        }}
        onRetry={async () => {
          try {
            await refetch();
          } catch (error) {
            isDev() && console.log("Fetching followers errors", error);
          }
        }}
      />
    );
  }

  if (!data || data.authorFollowingsWithCursor.edges.length === 0) {
    return null;
  }

  const {
    pageInfo: { hasNext, endCursor },
    edges,
  } = data.authorFollowingsWithCursor;

  const fetchMoreHandler = async () => {
    if (!hasNext) {
      return;
    }
    await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) {
          return {
            ...prev,
            authorFollowingsWithCursor: {
              ...prev.authorFollowingsWithCursor,
              pageInfo: {
                ...prev.authorFollowingsWithCursor.pageInfo,
                hasNext: false,
              },
            },
          };
        }
        return {
          ...prev,
          authorFollowingsWithCursor: {
            ...fetchMoreResult.authorFollowingsWithCursor,
            edges: _uniqBy(
              [
                ...prev.authorFollowingsWithCursor.edges,
                ...fetchMoreResult.authorFollowingsWithCursor.edges,
              ],
              "cursor",
            ),
          },
        };
      },
    });
  };

  return (
    <Swiper
      modules={[Navigation, Virtual]}
      navigation={{
        prevEl: `.${prevId}`,
        nextEl: `.${nextId}`,
        disabledClass: "hidden",
        hiddenClass: "hidden",
      }}
      slidesPerGroup={3}
      slidesPerView="auto"
    >
      <PrevButton className={prevId} aria-label="Previous" />
      <NextButton
        className={nextId}
        aria-label="Next"
        onClick={fetchMoreHandler}
      />
      {edges.map(({ node }, index) => (
        <SwiperSlide
          key={node.id}
          virtualIndex={index}
          className="flex items-center dark:first:px-1"
          style={{ width: "66px", height: "52px" }}
        >
          <FollowItem user={node} />
        </SwiperSlide>
      ))}
      {hasNext && (
        <SwiperSlide
          virtualIndex={edges.length}
          className="flex items-center dark:first:px-1"
          style={{ width: "66px", height: "52px" }}
        >
          <FollowLoadMore
            fetchMore={fetchMoreHandler}
            loading={networkStatus === NetworkStatus.fetchMore}
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
}
