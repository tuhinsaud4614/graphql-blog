import { Metadata } from "next";
import Link from "next/link";

import { PlusIcon } from "lucide-react";

import { ROUTES } from "@/lib/constants";

import HomeContent from "./_components/Content";
import FollowList from "./_components/FollowList";

export const metadata: Metadata = {
  title: "The RAT Diary | Home",
};

export default function HomePage() {
  return (
    <>
      <Link
        href={ROUTES.user.suggestions}
        aria-label="Suggestions"
        className="dark:text-neutral-dark-focus mb-6 mt-4 inline-flex items-center text-neutral-focus"
      >
        <span className="dark:bg-base-dark-300 mr-2 flex size-9 items-center justify-center rounded-full bg-base-300 text-foreground">
          <PlusIcon size={20} />
        </span>
        <span className="text-foreground">
          Keep up with the latest in any topic
        </span>
      </Link>
      <FollowList />
      <HomeContent />
    </>
  );
}
