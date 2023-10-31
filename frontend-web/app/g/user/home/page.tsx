import Link from "next/link";

import { ROUTES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      <Link href={ROUTES.landing}>Landing</Link>
    </div>
  );
}
