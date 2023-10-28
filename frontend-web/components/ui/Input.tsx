"use client";

import * as React from "react";

import { Eye, EyeOff, Info } from "lucide-react";

import { cn } from "@/lib/utils";

import Button from "./Button";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  leftIcon?: React.ReactNode;
  valid?: boolean;
  errorText?: React.ReactNode;
  classes?: {
    root?: string;
    label?: string;
    box?: string;
    input?: string;
    errIcon?: string;
    errText?: string;
  };
}

function Component(
  {
    leftIcon,
    title,
    id,
    className: cls,
    classes,
    valid = true,
    errorText,
    required,
    ...rest
  }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  const [show, setShow] = React.useState(false);
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center",
        classes?.root,
      )}
    >
      {title && (
        <label
          htmlFor={id}
          className={cn(
            "mb-3 text-sm",
            classes?.label,
            valid ? "text-neutral" : "text-error",
          )}
        >
          {title}
          {required && (
            <sup className="ml-0.5 select-none text-xs text-error">*</sup>
          )}
        </label>
      )}
      <div
        className={cn(
          "relative flex w-[inherit] items-center border-b text-neutral",
          valid ? "border-neutral" : "border-error",
          classes?.box,
        )}
      >
        {leftIcon}
        <input
          {...rest}
          type={
            rest.type === "password" ? (show ? "text" : "password") : rest.type
          }
          ref={ref}
          className={cn(
            "min-w-0 basis-full border-0 bg-transparent text-center leading-6 outline-none",
            classes?.input,
            cls,
          )}
          id={id}
          required={required}
        />
        {rest.type === "password" ? (
          <Button
            type="button"
            mode="text"
            variant="accent"
            className="h-5 w-5 shrink-0 rounded-full p-0.5"
            aria-label={show ? "hide" : "show"}
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <EyeOff /> : <Eye />}
          </Button>
        ) : (
          !valid && (
            <Info
              size={16}
              className={cn("ml-2 shrink-0 text-error", classes?.errIcon)}
            />
          )
        )}
      </div>
      {!valid && errorText && (
        <p
          className={cn(
            "mt-2 text-sm text-error selection:bg-error selection:text-base-100",
            classes?.errText,
          )}
          role="alert"
        >
          {errorText}
        </p>
      )}
    </div>
  );
}

const Input = React.forwardRef(Component);
export default Input;
