import { RedirectType, redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";

export default function UserRootPage() {
  redirect(ROUTES.landing, RedirectType.replace);
}
