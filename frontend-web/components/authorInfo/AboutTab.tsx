import { selectUser } from "@features";
import { User } from "graphql/generated/schema";
import { useAppSelector } from "store";
import { IUser } from "utils/interfaces";
import AddAbout from "./AddAbout";
import OtherAboutTab from "./OtherAbout";

interface Props {
  user?: IUser | User | null;
}

export default function AboutTab({ user }: Props) {
  const rdxUser = useAppSelector(selectUser);
  if (user && rdxUser && user.id === rdxUser.id) {
    return <AddAbout />;
  }

  return <OtherAboutTab />;
}
