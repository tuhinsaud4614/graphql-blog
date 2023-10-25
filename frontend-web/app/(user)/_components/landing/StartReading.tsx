"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export default function StartReading() {
  const { replace } = useRouter();
  return (
    <Button
      aria-label="Start reading"
      type="button"
      className="!py-2 px-5 text-xl capitalize"
      onClick={() => {
        replace(ROUTES.myHome);
      }}
    >
      Start reading
    </Button>
  );
}
