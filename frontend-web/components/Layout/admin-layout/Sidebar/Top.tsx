"use client";

import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/legacy/image";


interface Props {
  visible: boolean;
  onToggle?(): void;
}

export default function Top({ visible, onToggle }: Readonly<Props>) {
  return (
    <div className="flex items-center justify-between overflow-hidden p-4">
      <span className="flex size-[3.125rem] items-center justify-center">
        <Image
          src="/logo.svg"
          priority
          alt="The Rat Diary"
          height={50}
          width={50}
          layout="fixed"
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
        <ChevronRightIcon
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
