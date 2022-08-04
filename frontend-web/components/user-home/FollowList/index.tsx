import classNames from "classnames";
import { ComponentPropsWithoutRef } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import FollowItem from "./Item";

const className = {
  navBtn:
    "h-full absolute top-2/4 -translate-y-1/2 z-10 flex items-center justify-center text-neutral dark:text-neutral-dark",
};

const PrevButton = (props: ComponentPropsWithoutRef<"button">) => {
  const swiper = useSwiper();

  return (
    <button
      {...props}
      onClick={() => swiper.slidePrev()}
      className={classNames(
        className.navBtn,
        "left-0 bg-base-right dark:bg-base-dark-right pr-5",
        props.className
      )}
    >
      <IoChevronBackOutline size={34} />
    </button>
  );
};

const NextButton = (props: ComponentPropsWithoutRef<"button">) => {
  const swiper = useSwiper();
  return (
    <button
      {...props}
      onClick={() => swiper.slideNext()}
      className={classNames(
        className.navBtn,
        "right-0 bg-base-left dark:bg-base-dark-left pl-5",
        props.className
      )}
    >
      <IoChevronForwardOutline size={34} />
    </button>
  );
};

export default function FollowList() {
  const prevId = "prev-btn";
  const nextId = "next-btn";
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
      {Array.from({ length: 20 }).map((_, index) => (
        <SwiperSlide
          key={index}
          virtualIndex={index}
          style={{ width: "66px", height: "48px" }}
        >
          <FollowItem />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
