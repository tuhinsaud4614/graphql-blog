import { TrendingUp } from "lucide-react";

import LandingContainer from "../Container";
import TrendingList from "./List";

export default function Tending() {
  return (
    <LandingContainer classes={{ root: "border-b" }}>
      <div className="mb-4 flex items-center">
        <TrendingUp size={28} className="mr-2.5 text-neutral-focus" />
        <p className="text-sm font-bold uppercase text-neutral selection:bg-neutral selection:text-base-100">
          TRENDING ON RAT Diary
        </p>
      </div>
      <TrendingList />
    </LandingContainer>
  );
}
