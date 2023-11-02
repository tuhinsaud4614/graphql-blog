"use client";

import { useSession } from "next-auth/react";

import UserAvatarButton from "@/components/user-avatar-button";
import { skeletonVariant } from "@/lib/variants/classVariants";

export default function UserShortProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  }
  return (
    <UserAvatarButton
      user={session?.user}
      anchorOrigin={{ horizontal: "left", vertical: "top" }}
      hideOnSmallDevice
    />
  );
}
