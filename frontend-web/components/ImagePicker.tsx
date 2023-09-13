import * as React from "react";

import Image from "next/image";

import { motion, useAnimation } from "framer-motion";
import { BiX } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

import { useMediaQuery } from "@/hooks";
import { cn } from "@/utils";

const className = {
  container: "flex flex-col items-center",
  label: "mb-3 text-sm text-neutral dark:text-neutral-dark",
  root: "flex items-center justify-center relative w-full pb-[56.25%] max-w-lg mx-auto",
  picker:
    "absolute inset-0 z-10 border-2 border-dashed dark:border-base-dark-300 bg-gray-50 dark:bg-base-dark-200 outline-none rounded-md flex flex-col items-center justify-center",
  pickerTxt: "text-gray-500 dark:text-gray-400",
  preview:
    "absolute inset-0 z-10 border border-success dark:border-success-dark rounded-md",
  closeBtn:
    "absolute top-0 right-0 z-10 -translate-y-1/2 translate-x-1/2 rounded-full text-base-100 bg-error hover:bg-error-focus active:scale-95",
  errTxt: "mt-2 text-sm text-error dark:text-error-dark",
};

interface Props
  extends Omit<
    React.ComponentPropsWithRef<"input">,
    "value" | "onChange" | "type" | "accept" | "className"
  > {
  title: string;
  value: File | null;
  onFileChange(file: File | null): void;
  onTouched?(): void;
  valid?: boolean;
  errorText?: React.ReactNode;
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
  const matches = useMediaQuery("(prefers-color-scheme: dark)");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const animation = useAnimation();

  const handleDrag = (
    e: React.DragEvent<HTMLButtonElement>,
    status: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (status) {
      return animation.set({
        borderColor: "red",
        background: matches ? "#001e3c" : "#f3f4f6",
      });
    }

    animation.set({
      borderColor: "#e5e7eb",
      background: matches ? "#001e3c" : "#f9fafb",
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    onTouched && onTouched();
    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      onFileChange(file);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length) {
      onFileChange(files[0]);
    }
  };

  return (
    <div className={cn(className.container, classes?.container)}>
      <label
        className={cn(className.label, classes?.label, !valid && "text-error")}
      >
        {title}
        {rest.required && <sup className="text-xs text-error">*</sup>}
      </label>
      <div className={cn(className.root, classes?.root)}>
        {value && value.type.startsWith("image/") ? (
          <div className={cn(className.preview, classes?.preview)}>
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
        ) : (
          <React.Fragment>
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
              className={cn(className.picker, classes?.picker)}
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
              <FiUpload size={40} className="text-gray-400" />
              <p className={cn("my-2 text-sm", className.pickerTxt)}>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className={cn("text-xs", className.pickerTxt)}>
                SVG, PNG, JPG, JPEG, WEBP or GIF (MAX. SIZE 5MB)
              </p>
            </motion.button>
          </React.Fragment>
        )}
      </div>
      {!valid && errorText && (
        <p className={cn(className.errTxt, classes?.errTxt)} role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}
