"use client";

import { Descendant } from "slate";


import { User } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { IAuthUser } from "@/lib/types";
import AddAbout from "./AddAbout";
import OtherAboutTab from "./OtherAbout";

interface Props {
  user?: IAuthUser | User | null;
  userId: string;
}

export default function AboutTab({ user, userId }: Readonly<Props>) {
  const authUser = useUser();
  if (user && authUser && user.id === authUser.id) {
    const about = authUser.about
      ? (JSON.parse(authUser.about) as Descendant[])
      : null;
    return <AddAbout previousValue={about} />;
  }
  const about = user?.about ? (JSON.parse(user.about) as Descendant[]) : null;
  return <OtherAboutTab about={about} userId={userId} />;
}
