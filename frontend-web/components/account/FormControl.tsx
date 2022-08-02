import classNames from "classnames";
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import { BsInfoCircle } from "react-icons/bs";

const className = {
  formControl: "flex flex-col items-center justify-center w-full",
  formLabel: "mb-3 text-sm",
  requiredText: "ml-0.5 text-xs text-error dark:text-error-dark",
  formInputBox: "relative border-b flex items-center w-[inherit]",
  formInput:
    "text-neutral dark:text-neutral-dark leading-6 min-w-0 basis-full bg-transparent outline-none border-0 text-center",
  errIcon: "text-error dark:text-error-dark ml-2",
  error: "mt-2 text-sm text-error dark:text-error-dark",
};

interface Props extends ComponentPropsWithoutRef<"input"> {
  title: string;
  valid?: boolean;
  errorText?: ReactNode;
  classes?: {
    root?: string;
    label?: string;
    box?: string;
    input?: string;
    errIcon?: string;
    errText?: string;
  };
}

const FormControl = forwardRef<HTMLInputElement, Props>(
  (
    {
      title,
      id,
      className: cls,
      classes,
      valid = true,
      errorText,
      required,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={classNames(className.formControl, classes?.root)}>
        <label
          htmlFor={id}
          className={classNames(
            className.formLabel,
            classes?.label,
            valid
              ? "text-neutral dark:text-neutral-dark"
              : "text-error dark:text-error-dark"
          )}
        >
          {title}
          {required && <sup className={className.requiredText}>*</sup>}
        </label>
        <div
          className={classNames(
            className.formInputBox,
            classes?.box,
            valid
              ? "border-neutral dark:border-neutral-dark"
              : "border-error dark:border-error-dark"
          )}
        >
          <input
            {...rest}
            ref={ref}
            className={classNames(className.formInput, classes?.input, cls)}
            id={id}
            required={required}
          />
          {!valid && (
            <BsInfoCircle
              size={16}
              className={classNames(className.errIcon, classes?.errIcon)}
            />
          )}
        </div>
        {!valid && errorText && (
          <p
            className={classNames(className.error, classes?.errText)}
            role="alert"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

FormControl.displayName = "FormControl";
export default FormControl;
