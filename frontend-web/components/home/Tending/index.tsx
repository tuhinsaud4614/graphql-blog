import { IoTrendingUpOutline } from "react-icons/io5";

import { HomeWrapper } from "..";
import TrendingItems from "./Items";

const className = {
  root: "border-b",
  header: "flex items-center mb-4",
  icon: "text-neutral-focus dark:text-neutral-dark-focus mr-2.5",
  title: "text-sm font-bold uppercase text-neutral dark:text-neutral-dark",
};

export default function Tending() {
  return (
    <HomeWrapper classes={{ root: className.root }}>
      <div className={className.header}>
        <IoTrendingUpOutline size={28} className={className.icon} />
        <p className={className.title}>TRENDING ON RAT Diary</p>
      </div>
      <TrendingItems />
    </HomeWrapper>
  );
}
