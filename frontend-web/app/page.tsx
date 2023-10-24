import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-primary">
      <Link href="/dashboard">Dashboard</Link>
    </main>
  );
}
