"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

export default function FavoriteButton() {
  const { data: user } = useSession();
  if (!user) {
    return null;
  }
  return (
    <button
      type="button"
      aria-label="Favorite"
      className="ml-2 text-secondary hover:text-secondary-focus active:scale-95"
    >
      <Heart
        className={cn(true && "fill-secondary hover:fill-secondary-focus")}
      />
    </button>
  );
}
