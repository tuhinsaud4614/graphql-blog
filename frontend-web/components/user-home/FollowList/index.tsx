import * as React from "react";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { ErrorBox } from "@/components";
import { selectUser } from "@/features";
import { useGetAuthorFollowingsWithCursorQuery } from "@/graphql/generated/schema";
import { useAppSelector } from "@/store";
import { cn, gplErrorHandler, isDev } from "@/utils";

import FollowItem from "./Item";
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
      onClick={() => swiper.slidePrev()}
      className={cn(
        className.navBtn,
        "left-0 bg-base-right pr-5 dark:bg-base-dark-right",
        props.className,
      )}
    >
      <IoChevronBackOutline size={34} />
    </button>
  );
};

const NextButton = (props: React.ComponentPropsWithoutRef<"button">) => {
  const swiper = useSwiper();
  return (
    <button
      {...props}
      onClick={() => swiper.slideNext()}
      className={cn(
        className.navBtn,
        "right-0 bg-base-left pl-5 dark:bg-base-dark-left",
        props.className,
      )}
    >
      <IoChevronForwardOutline size={34} />
    </button>
  );
};

export default function FollowList() {
  const rdxUser = useAppSelector(selectUser);
  const { data, error, loading, refetch } =
    useGetAuthorFollowingsWithCursorQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      variables: { limit: 2 },
    });

  const prevId = "prev-btn";
  const nextId = "next-btn";

  if (!rdxUser) {
    return null;
  }

  if (loading) {
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
      <NextButton className={nextId} aria-label="Next" />
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
    </Swiper>
  );
}
