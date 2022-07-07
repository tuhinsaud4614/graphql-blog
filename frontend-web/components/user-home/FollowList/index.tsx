import classNames from "classnames";
import { useRef } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Navigation, Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import FollowItem from "./Item";

const className = {
  root: "rounded-[0.1875rem]",
  navBtn:
    "h-full absolute top-2/4 -translate-y-1/2 z-10 flex items-center justify-center",
  navIcon: "text-neutral",
};

export default function FollowList() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Swiper
      modules={[Navigation, Virtual]}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
        disabledClass: "hidden",
      }}
      slidesPerGroup={3}
      slidesPerView="auto"
      className={className.root}
    >
      <button
        ref={prevRef}
        className={classNames(className.navBtn, "left-0 bg-base-right pr-5")}
      >
        <IoChevronBackOutline size={34} className={className.navIcon} />
      </button>
      <button
        ref={nextRef}
        className={classNames(className.navBtn, "right-0 bg-base-left pl-5")}
      >
        <IoChevronForwardOutline size={34} className={className.navIcon} />
      </button>
      {Array.from({ length: 10 }).map((_, index) => (
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
