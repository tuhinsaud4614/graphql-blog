import { Metadata } from "next";
import Link from "next/link";

import { ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The RAT Diary | Home",
};

export default function HomePage() {
  return (
    <div>
      <Link href={ROUTES.landing}>Landing</Link>
    </div>
  );
}
