import { RedirectType, redirect } from "next/navigation";

import { ROUTES } from "@/lib/constants";

export default function AccountRootPage() {
  redirect(ROUTES.account.login, RedirectType.replace);
}
