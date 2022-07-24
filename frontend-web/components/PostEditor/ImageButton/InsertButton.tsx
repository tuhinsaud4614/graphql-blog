import { ComponentPropsWithoutRef } from "react";

const className = {
  btn: "mx-3 my-3 px-2 py-1.5 outline-none border-0 text-sm rounded-md inline-block bg-success hover:bg-success-focus text-base-100 enabled:shadow-mui enabled:hover:shadow-mui-hover enabled:active:shadow-mui-active enabled:active:scale-95 disabled:bg-success-disabled disabled:text-neutral/50 disabled:cursor-not-allowed",
};

export default function InsertButton(
  props: ComponentPropsWithoutRef<"button">
) {
  return (
    <button
      {...props}
      aria-label="Insert image"
      type="button"
      className={className.btn}
    >
      Insert image
    </button>
  );
}
