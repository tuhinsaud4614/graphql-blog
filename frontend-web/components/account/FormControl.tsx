import * as React from "react";

import { BsInfoCircle } from "react-icons/bs";

import { cn } from "@/utils";

const className = {
  formControl: "flex flex-col items-center justify-center w-full",
  formLabel: "mb-3 text-sm",
  requiredText: "ml-0.5 text-xs text-error dark:text-error-dark",
  formInputBox:
    "relative border-b flex items-center w-[inherit] text-neutral dark:text-neutral-dark",
  formInput:
    "leading-6 min-w-0 basis-full bg-transparent outline-none border-0 text-center",
  errIcon: "text-error dark:text-error-dark ml-2",
  error: "mt-2 text-sm text-error dark:text-error-dark",
};

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

const FormControl = React.forwardRef<HTMLInputElement, Props>(
  (
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
    },
    ref,
  ) => {
    return (
      <div className={cn(className.formControl, classes?.root)}>
        {title && (
          <label
            htmlFor={id}
            className={cn(
              className.formLabel,
              classes?.label,
              valid
                ? "text-neutral dark:text-neutral-dark"
                : "text-error dark:text-error-dark",
            )}
          >
            {title}
            {required && <sup className={className.requiredText}>*</sup>}
          </label>
        )}
        <div
          className={cn(
            className.formInputBox,
            classes?.box,
            valid
              ? "border-neutral dark:border-neutral-dark"
              : "border-error dark:border-error-dark",
          )}
        >
          {leftIcon}
          <input
            {...rest}
            ref={ref}
            className={cn(className.formInput, classes?.input, cls)}
            id={id}
            required={required}
          />
          {!valid && (
            <BsInfoCircle
              size={16}
              className={cn(className.errIcon, classes?.errIcon)}
            />
          )}
        </div>
        {!valid && errorText && (
          <p className={cn(className.error, classes?.errText)} role="alert">
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

FormControl.displayName = "FormControl";
export default FormControl;
