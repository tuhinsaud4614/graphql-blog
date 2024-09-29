"use client";

import { skeletonVariant } from "@/lib/variants/classVariants";

export default function SettingSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex max-w-md flex-1 flex-col justify-center gap-2">
          <span
            className={skeletonVariant({
              shape: "round",
              className: "w-28 h-6",
            })}
          />
          <span
            className={skeletonVariant({
              shape: "round",
              className: "w-full h-5",
            })}
          />
          <span
            className={skeletonVariant({
              shape: "round",
              className: "w-full h-3",
            })}
          />
          <span
            className={skeletonVariant({
              shape: "round",
              className: "w-full h-3",
            })}
          />
        </div>
        <span
          className={skeletonVariant({
            shape: "circle",
            className: "flex self-start shrink-0 h-9 w-14",
          })}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex max-w-md flex-1 flex-col justify-center gap-2">
          <span
            className={skeletonVariant({
              shape: "round",
              className: "w-28 h-6",
            })}
          />
          <div className="flex justify-between gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <span
                className={skeletonVariant({
                  shape: "round",
                  className: "w-full h-5 block",
                })}
              />
              <span
                className={skeletonVariant({
                  shape: "round",
                  className: "w-full h-3 block",
                })}
              />
              <span
                className={skeletonVariant({
                  shape: "round",
                  className: "w-full h-6 block",
                })}
              />
            </div>
            <span
              className={skeletonVariant({
                shape: "circle",
                className: "w-[4.875rem] h-[4.875rem]",
              })}
            />
          </div>
        </div>
        <span
          className={skeletonVariant({
            shape: "circle",
            className: "flex self-start shrink-0 h-9 w-14",
          })}
        />
      </div>
    </div>
  );
}
