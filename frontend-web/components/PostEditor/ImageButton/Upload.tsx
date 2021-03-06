import classNames from "classnames";
import _ from "lodash";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { maxFileSize } from "utils";
import { IMAGE_MIMES } from "utils/constants";
import InsertButton from "./InsertButton";
import Loader from "./Loader";

const className = {
  imgUpload: "flex flex-col items-center justify-between",
  chooseBtn:
    "outline-none border border-dashed rounded-md w-full min-h-[7.75rem] bg-gray-50 text-gray-500 relative p-2",
  imgContainer: "relative w-full pb-[56.25%]",
  errTxt: "mt-1 text-error-content text-xs",
};

const promise = (file: File) =>
  new Promise<string>((res) => {
    setTimeout(() => {
      res(URL.createObjectURL(file));
    }, 1000);
  });

interface Props {
  onAdd(url: string): void;
}

export function Upload({ onAdd }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
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
        className={classNames(className.chooseBtn)}
      >
        {loading && <Loader />}
        {!image ? (
          "Click to upload"
        ) : (
          <div className={className.imgContainer}>
            <div className="absolute inset-0 z-10">
              <Image
                src={image}
                alt="Preview Image"
                layout="fill"
                className="rounded-md"
              />
            </div>
          </div>
        )}
      </button>
      {error && <p className={className.errTxt}>{error}</p>}
      <InsertButton
        disabled={!image || loading}
        onClick={() => {
          image && onAdd(image);
        }}
      />
    </div>
  );
}
