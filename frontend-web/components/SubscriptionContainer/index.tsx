import * as React from "react";

import { selectUser } from "@/features";
import { useAppSelector } from "@/store";

import Notification from "./Notification";

export default function SubscriptionContainer() {
  const rdxUser = useAppSelector(selectUser);
  return <React.Fragment>{rdxUser && <Notification />}</React.Fragment>;
}
