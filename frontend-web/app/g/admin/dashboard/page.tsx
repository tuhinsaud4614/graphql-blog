import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The RAT Diary | Dashboard",
};

export default function Dashboard() {
  return (
    <main className="bg-primary">
      <Link href="/">Home</Link>
    </main>
  );
}
