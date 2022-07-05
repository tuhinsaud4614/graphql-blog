import { IoTrendingUpOutline } from "react-icons/io5";
import TrendingItems from "./Items";

const className = {
  root: "border-b",
  content: "px-4 sm:mx-auto max-w-5xl pt-10 pb-4",
  header: "flex items-center mb-4",
  icon: "text-neutral-focus mr-2.5",
  title: "text-sm font-bold uppercase text-neutral",
};

export default function Tending() {
  return (
    <section className={className.root}>
      <div className={className.content}>
        <div className={className.header}>
          <IoTrendingUpOutline size={28} className={className.icon} />
          <p className={className.title}>TRENDING ON RAT Diary</p>
        </div>
        <TrendingItems />
      </div>
    </section>
  );
}
