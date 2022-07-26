import classNames from "classnames";
import { ComponentPropsWithRef } from "react";

const className = {
  label: "pointer flex items-center py-2 px-1 select-none cursor-pointer",
  input:
    "shrink-0 h-6 w-6 cursor-pointer appearance-none border rounded-lg border-primary",
  inputCheck:
    "checked:animate-check-mark checked:bg-check-primary checked:bg-no-repeat checked:bg-primary",
  text: "ml-3 text-sm text-neutral dark:text-neutral-dark",
};

interface Props extends Omit<ComponentPropsWithRef<"input">, "type"> {
  label?: string;
  classes?: {
    label?: string;
    input?: string;
    text?: string;
  };
}

export default function CheckInput({
  label,
  id,
  className: cls,
  classes,
  ...rest
}: Props) {
  return (
    <label className={classNames(className.label, classes?.label)} htmlFor={id}>
      <input
        {...rest}
        id={id}
        className={classNames(
          className.input,
          className.inputCheck,
          cls,
          classes?.input
        )}
        type="checkbox"
      />
      {label && (
        <span className={classNames(className.text, classes?.text)}>
          {label}
        </span>
      )}
    </label>
  );
}
