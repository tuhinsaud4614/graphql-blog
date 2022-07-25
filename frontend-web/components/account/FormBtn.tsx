import classNames from "classnames";
import { ComponentPropsWithRef } from "react";
import { ImSpinner2 } from "react-icons/im";

const className = {
  btnContainer: "flex justify-center py-3",
  btn: "w-[14.125rem] outline-none border-0 px-5 py-2 rounded-full inline-block bg-accent hover:bg-accent-focus text-neutral enabled:shadow-mui enabled:hover:shadow-mui-hover enabled:active:shadow-mui-active enabled:active:scale-95 disabled:bg-accent/30 disabled:text-neutral/50 disabled:cursor-not-allowed",
  btnLoader: "flex items-center justify-center",
  btnSpin: "text-white animate-spin ml-2 text-sm",
};

interface Props extends ComponentPropsWithRef<"button"> {
  loader?: boolean;
  classes?: {
    root?: string;
    btn?: string;
  };
}

export default function FormButton({
  loader,
  classes,
  children,
  ...rest
}: Props) {
  return (
    <div className={classNames(className.btnContainer, classes?.root)}>
      <button
        {...rest}
        className={classNames(
          className.btn,
          classes?.btn,
          loader && className.btnLoader
        )}
      >
        {children}
        {loader && <ImSpinner2 className={className.btnSpin} />}
      </button>
    </div>
  );
}
