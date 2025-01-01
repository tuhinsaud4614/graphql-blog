"use client";

import Button from "@/components/ui/Button";

import { useDraftSettingsLoading } from "../../_hooks/useDraftSettings";
import { useNewPostData } from "../../_hooks/useNewPost";

export default function HeaderContent() {
  const isLoading = useDraftSettingsLoading();
  const data = useNewPostData();
  console.log("data", data);
  return (
    <div className="flex w-full items-center justify-between">
      {isLoading ? "Saving Draft" : "Draft"}
      {!!data && (
        <Button variant="accent" className="px-2.5 py-1 text-xs">
          Publish
        </Button>
      )}
    </div>
  );
}
