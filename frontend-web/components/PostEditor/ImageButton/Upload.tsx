import classNames from "classnames";
import _ from "lodash";
import Image from "next/image";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { maxFileSize } from "utils";
import { IMAGE_MIMES } from "utils/constants";

const className = {
  imgUpload: "flex flex-col items-center justify-between",
  chooseBtn:
    "outline-none border border-dashed rounded-md w-full h-full bg-gray-50 text-gray-500 relative",
  imgContainer: "relative w-full pb-[56.25%]",
  errTxt: "mt-1 text-error-content text-xs",
  btn: "mx-3 my-3 px-2 py-1.5 outline-none border-0 text-sm rounded-md inline-block bg-success hover:bg-success-focus text-base-100 enabled:shadow-mui enabled:hover:shadow-mui-hover enabled:active:shadow-mui-active enabled:active:scale-95 disabled:bg-success-disabled disabled:text-neutral/50 disabled:cursor-not-allowed",
  btnLoader:
    "absolute z-20 inset-0 flex items-center justify-center bg-black/10 rounded-md border border-dashed",
  btnSpin: "animate-spin ml-2 text-sm text-warning-content",
};

const promise = (file: File) =>
  new Promise<File>((res) => {
    setTimeout(() => {
      res(file);
    }, 1000);
  });

interface Props {
  onAdd(image: File): void;
}

export function Upload({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length) {
      setError("");
      setLoading(true);
      try {
        const file = files[0];
        const img = await promise(file);
        if (!_.has(IMAGE_MIMES, file.type)) {
          setError("File should be image (gif, svg, jpeg, jpg, png, webp)");
        } else if (file.size > maxFileSize(2)) {
          setError("Image size should be less than 5mb");
        } else {
          setImage(img);
        }
      } catch (error) {
        setError("Upload image failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={className.imgUpload}>
      <Fragment>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          aria-label="Image Picker"
          className="hidden"
          onChange={onChange}
        />
        <button
          aria-label="Image Picker"
          type="button"
          onClick={() => inputRef.current?.click()}
          className={classNames(className.chooseBtn, image ? "p-2" : "p-3")}
        >
          {loading && (
            <span className={className.btnLoader}>
              <ImSpinner2 size={24} className={className.btnSpin} />
            </span>
          )}
          {!image ? (
            "Click top upload"
          ) : (
            <div className={className.imgContainer}>
              <div className="absolute inset-0 z-10">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview Image"
                  layout="fill"
                  className="rounded-md"
                />
              </div>
            </div>
          )}
        </button>
        {error && <p className={className.errTxt}>{error}</p>}
        <button
          aria-label="Upload"
          type="button"
          className={className.btn}
          disabled={!image || loading}
          onClick={() => {
            image && onAdd(image);
          }}
        >
          Insert image
        </button>
      </Fragment>
    </div>
  );
}
