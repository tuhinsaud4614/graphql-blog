"use client";

import * as React from "react";

import Image from "next/image";

import _has from "lodash/has";
import { Camera } from "lucide-react";

import DemoAvatar from "@/components/DemoAvatar";
import { IMAGE_MIMES } from "@/lib/constants";
import { cn, maxFileSize } from "@/lib/utils";

interface Props {
  image?: string | null;
  onImageChange(image: File): void;
  editable: boolean;
  onEdit(): void;
}

export default function AvatarPicker({
  editable,
  image,
  onImageChange,
  onEdit,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const file = files?.[0];
    if (file) {
      if (!_has(IMAGE_MIMES, file.type) || file.size > maxFileSize(5)) {
        return;
      }
      onImageChange(file);
    }
  };
  return (
    <div className="ml-5 shrink-0">
      <div
        className={cn(
          "relative h-20 w-20 rounded-full border",
          image && "overflow-hidden",
        )}
      >
        {image ? (
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={image}
            alt="Avatar"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <DemoAvatar className="h-20 w-20" size={80 / 1.8} />
        )}
        {editable ? (
          <div className="absolute inset-0 z-10 overflow-hidden rounded-full bg-black/[54%]">
            <input
              aria-label="Choose Avatar"
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
            <button
              aria-label="Avatar picker"
              type="button"
              className="flex h-full w-full items-center justify-center border-none text-base-100/60 outline-none hover:text-base-100"
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              <Camera
                className="text-base-100/60 dark:text-neutral/60"
                size={54}
              />
            </button>
          </div>
        ) : (
          <button
            aria-label="Editable"
            type="button"
            className="absolute inset-0 z-10 block h-full w-full border-none outline-none"
            onClick={onEdit}
          />
        )}
      </div>
    </div>
  );
}
