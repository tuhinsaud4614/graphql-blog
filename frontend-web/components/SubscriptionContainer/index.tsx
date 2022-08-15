import { selectUser } from "@features";
import { Fragment } from "react";
import { useAppSelector } from "store";
import Notification from "./Notification";

export default function SubscriptionContainer() {
  const rdxUser = useAppSelector(selectUser);
  return <Fragment>{rdxUser && <Notification />}</Fragment>;
}
