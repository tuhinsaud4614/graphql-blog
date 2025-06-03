"use client";

import * as React from "react";


import useUser from "@/hooks/useUser";
import Notification from "./Notification";

export default function SubscriptionContainer() {
  const user = useUser();
  return <React.Fragment>{user && <Notification />}</React.Fragment>;
}
