import { selectUser } from "@features";
import { User } from "graphql/generated/schema";
import { Descendant } from "slate";
import { useAppSelector } from "store";
import { IUser } from "utils/interfaces";
import AddAbout from "./AddAbout";
import OtherAboutTab from "./OtherAbout";

interface Props {
  user?: IUser | User | null;
  userId: string;
}

export default function AboutTab({ user, userId }: Props) {
  const rdxUser = useAppSelector(selectUser);
  if (user && rdxUser && user.id === rdxUser.id) {
    const about = rdxUser.about
      ? (JSON.parse(rdxUser.about) as Descendant[])
      : null;
    return <AddAbout previousValue={about} />;
  }
  const about = user?.about ? (JSON.parse(user.about) as Descendant[]) : null;
  return <OtherAboutTab about={about} userId={userId} />;
}
