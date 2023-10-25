import { TrendingUp } from "lucide-react";

import LandingContainer from "../Container";
import TrendingList from "./List";

const className = {
  root: "border-b",
  header: "flex items-center mb-4",
  icon: "text-neutral-focus dark:text-neutral-dark-focus mr-2.5",
  title: "text-sm font-bold uppercase text-neutral dark:text-neutral-dark",
};

export default function Tending() {
  return (
    <LandingContainer classes={{ root: "border-b" }}>
      <div className="mb-4 flex items-center">
        <TrendingUp size={28} className="mr-2.5 text-neutral-focus" />
        <p className="text-sm font-bold uppercase text-neutral">
          TRENDING ON RAT Diary
        </p>
      </div>
      <TrendingList />
    </LandingContainer>
  );
}
