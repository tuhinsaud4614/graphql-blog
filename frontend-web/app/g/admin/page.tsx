import { RedirectType, redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";

export default function AdminRootPage() {
  redirect(ROUTES.admin.dashboard, RedirectType.replace);
}
