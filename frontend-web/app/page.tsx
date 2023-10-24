import Link from "next/link";

import Header from "./_components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-[2000px] bg-primary">
        <Link href="/dashboard">Dashboard</Link>
      </main>
    </>
  );
}
