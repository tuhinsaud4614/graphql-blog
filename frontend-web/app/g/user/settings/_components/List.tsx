"use client";

import { useSession } from "next-auth/react";

import AvatarEdit from "./AvatarEdit";
import NameEdit from "./NameEdit";
import SettingSkeleton from "./Skeleton";

export default function SettingsList() {
  const { data: session, update } = useSession();

  if (session?.user) {
    return (
      <ul className="m-0 flex list-none flex-col">
        <NameEdit user={session.user} update={update} />
        <AvatarEdit user={session.user} update={update} />
      </ul>
    );
  }

  return <SettingSkeleton />;
}
