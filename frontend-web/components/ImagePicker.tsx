import classNames from "classnames";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import {
  ChangeEvent,
  ComponentPropsWithRef,
  DragEvent,
  Fragment,
  ReactNode,
  useRef,
} from "react";
import { BiX } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

const className = {
  container: "flex flex-col items-center",
  label: "mb-3 text-sm text-neutral",
  root: "flex items-center justify-center relative w-full pb-[56.25%] max-w-lg mx-auto",
  picker:
    "absolute inset-0 z-10 border border-dotted outline-none rounded-md flex flex-col items-center justify-center text-primary",
  preview: "absolute inset-0 z-10 border border-success rounded-md",
  closeBtn:
    "absolute top-0 right-0 z-10 -translate-y-1/2 translate-x-1/2 rounded-full text-base-100 bg-error hover:bg-error-focus active:scale-95",
  errTxt: "mt-2 text-sm text-error",
};

interface Props
  extends Omit<
    ComponentPropsWithRef<"input">,
    "value" | "onChange" | "type" | "accept" | "className"
  > {
  title: string;
  value: File | null;
  onFileChange(file: File | null): void;
  onTouched?(): void;
  valid?: boolean;
  errorText?: ReactNode;
  classes?: {
    container?: string;
    label?: string;
    root?: string;
    picker?: string;
    preview?: string;
    closeBtn?: string;
    errTxt?: string;
  };
}

export default function ImagePicker({
  title,
  onFileChange,
  value,
  errorText,
  onTouched,
  valid = false,
  classes,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const animation = useAnimation();

  const handleDrag = (e: DragEvent<HTMLButtonElement>, status: boolean) => {
    e.preventDefault();
    e.stopPropagation();

    if (status) {
      return animation.set({ borderColor: "red", background: "#f1f5f9" });
    }

    animation.set({ borderColor: "#e5e7eb", background: "#ffffff" });
  };

  const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
    onTouched && onTouched();
    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      onFileChange(file);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length) {
      onFileChange(files[0]);
    }
  };

  return (
    <div className={classNames(className.container, classes?.container)}>
      <label
        className={classNames(
          className.label,
          classes?.label,
          !valid && "text-error"
        )}
      >
        {title}
        {rest.required && <sup className="text-xs text-error">*</sup>}
      </label>
      <div className={classNames(className.root, classes?.root)}>
        {!valid && (
          <Fragment>
            <input
              {...rest}
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
            <motion.button
              aria-label="Image picker"
              type="button"
              animate={animation}
              className={classNames(className.picker, classes?.picker)}
              onDragEnter={(e) => handleDrag(e, true)}
              onDragOver={(e) => handleDrag(e, true)}
              onDragLeave={(e) => handleDrag(e, false)}
              onDrop={(e) => {
                handleDrop(e);
                handleDrag(e, false);
              }}
              onClick={(e) => {
                if (inputRef.current) {
                  onTouched && onTouched();
                  inputRef.current.click();
                }
              }}
            >
              <FiUpload size={26} />
              <span className="mt-2 text-center">Drop Image</span>
            </motion.button>
          </Fragment>
        )}
        {valid && value && (
          <div className={classNames(className.preview, classes?.preview)}>
            <button
              aria-label="Close"
              className={className.closeBtn}
              type="button"
              onClick={() => onFileChange(null)}
            >
              <BiX size={20} />
            </button>
            <Image
              src={URL.createObjectURL(value)}
              alt="Preview Image"
              layout="fill"
              className="rounded-md"
            />
          </div>
        )}
      </div>
      {!valid && errorText && (
        <p
          className={classNames(className.errTxt, classes?.errTxt)}
          role="alert"
        >
          {errorText}
        </p>
      )}
    </div>
  );
}
