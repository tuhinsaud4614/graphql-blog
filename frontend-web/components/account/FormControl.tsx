import classNames from "classnames";
import { ComponentPropsWithRef, ReactNode } from "react";
import { BsInfoCircle } from "react-icons/bs";

const className = {
  formControl: "flex flex-col items-center justify-center w-full",
  formLabel: "mb-3 text-sm",
  formInputBox: "relative border-b flex items-center w-[inherit]",
  formInput:
    "text-neutral leading-6 min-w-0 basis-full bg-transparent outline-none border-0 text-center",
  errIcon: "text-error ml-2",
  error: "mt-2 text-sm text-error",
};

interface Props extends ComponentPropsWithRef<"input"> {
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

export default function FormControl({
  title,
  id,
  className: cls,
  classes,
  valid = true,
  errorText,
  ...rest
}: Props) {
  return (
    <div className={classNames(className.formControl, classes?.root)}>
      <label
        htmlFor={id}
        className={classNames(
          className.formLabel,
          classes?.label,
          valid ? "text-neutral" : "text-error"
        )}
      >
        {title}
      </label>
      <div
        className={classNames(
          className.formInputBox,
          classes?.box,
          valid ? "border-neutral" : "border-error"
        )}
      >
        <input
          {...rest}
          className={classNames(className.formInput, classes?.input, cls)}
          id={id}
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
