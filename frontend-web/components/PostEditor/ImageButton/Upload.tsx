import * as React from "react";

import Image from "next/image";

import _ from "lodash";

import { Button } from "@/components";
import { useUploadImageMutation } from "@/graphql/generated/schema";
import { cn, generateFileUrl, maxFileSize } from "@/utils";
import { IMAGE_MIMES } from "@/utils/constants";

import Loader from "./Loader";

const className = {
  imgUpload: "flex flex-col items-center justify-between",
  chooseBtn:
    "outline-none border dark:border-base-dark-300 border-dashed rounded-md w-full min-h-[7.75rem] bg-gray-50 dark:bg-base-dark-100 text-gray-500 relative p-2",
  imgContainer: "relative w-full pb-[56.25%]",
  errTxt: "mt-1 text-error-content dark:text-error-dark text-xs",
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
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  const [uploadImage] = useUploadImageMutation({
    notifyOnNetworkStatusChange: true,
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;
    if (files?.length) {
      setError("");
      setLoading(true);
      try {
        const file = files[0];

        if (!_.has(IMAGE_MIMES, file.type)) {
          setError("File should be image (gif, svg, jpeg, jpg, png, webp)");
        } else if (file.size > maxFileSize(2)) {
          setError("Image size should be less than 2mb");
        } else {
          const { data, errors } = await uploadImage({
            variables: { image: file },
          });

          if (data?.uploadImage) {
            const img = generateFileUrl(data.uploadImage);
            img ? setImage(img) : setError("Image upload failed");
          } else {
            setError("Image upload failed");
          }
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
        className={cn(className.chooseBtn)}
      >
        {loading && <Loader />}
        {!image ? (
          "Click to upload"
        ) : (
          <div className={className.imgContainer}>
            <div className="absolute inset-0 z-10">
              <Image
                loader={({ src, width, quality }) =>
                  `${src}?w=${width}&q=${quality || 75}`
                }
                priority
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
      <Button
        aria-label="Insert image"
        type="button"
        className="m-3 !rounded-md !px-2 !py-1.5 text-sm"
        variant="success"
        disabled={!image || loading}
        onClick={() => {
          image && onAdd(image);
        }}
      >
        Insert image
      </Button>
    </div>
  );
}
