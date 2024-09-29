"use client";

import Image from "next/image";

import { ChevronRight } from "lucide-react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  visible: boolean;
  onToggle?(): void;
}

export default function Top({ visible, onToggle }: Props) {
  return (
    <div className="flex items-center justify-between overflow-hidden p-4">
      <span className="flex h-[3.125rem] w-[3.125rem] items-center justify-center">
        <Image
          src="/logo.svg"
          alt="The Rat Diary"
          height={50}
          width={50}
          priority
        />
      </span>
      <Button
        mode="text"
        className={cn(
          "hidden !p-2 text-base-100",
          visible ? "xl:flex" : "xl:group-hover:flex",
        )}
        onClick={onToggle}
      >
        <ChevronRight
          className={cn(
            "transition-transform duration-200",
            visible && "-rotate-180",
          )}
          size={24}
        />
      </Button>
    </div>
  );
}
