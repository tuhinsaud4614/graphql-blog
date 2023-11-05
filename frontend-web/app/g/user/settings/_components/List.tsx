"use client";

import { useSession } from "next-auth/react";

import NameEdit from "./NameEdit";
import SettingSkeleton from "./Skeleton";

export default function SettingsList() {
  const { data: session, status, update } = useSession();

  if (status === "loading") {
    return <SettingSkeleton />;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <ul className="m-0 flex list-none flex-col">
      <NameEdit user={session.user} update={update} />
    </ul>
  );
}
