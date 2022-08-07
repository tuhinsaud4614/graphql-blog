import classNames from "classnames";
import DemoAvatar from "components/DemoAvatar";
import _ from "lodash";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { maxFileSize } from "utils";
import { IMAGE_MIMES } from "utils/constants";

const className = {
  root: "ml-5 shrink-0",
  container: "w-20 h-20 rounded-full relative",
  controller:
    "absolute z-10 inset-0 bg-black/[54%] overflow-hidden rounded-full",
  btn: "outline-none border-none w-full h-full flex items-center justify-center text-base-100/60 hover:text-base-100",
};

interface Props {
  image?: string | null;
  onImageChange(image: File): void;
  editable: boolean;
  onEdit(): void;
}

export default function AvatarPicker({
  editable,
  image,
  onImageChange,
  onEdit,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.length) {
      const file = files[0];
      if (!_.has(IMAGE_MIMES, file.type) || file.size > maxFileSize(5)) {
        return;
      }
      onImageChange(file);
    }
  };
  return (
    <div className={className.root}>
      <div
        className={classNames(className.container, image && "overflow-hidden")}
      >
        {image ? (
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={image}
            alt="Avatar"
            width={80}
            height={80}
            objectFit="cover"
            layout="responsive"
            className="rounded-full"
          />
        ) : (
          <DemoAvatar className="h-20 w-20" size={80 / 1.8} />
        )}
        {editable ? (
          <div className={className.controller}>
            <input
              aria-label="Choose Avatar"
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onChange}
            />
            <button
              aria-label="Avatar picker"
              type="button"
              className={className.btn}
              onClick={(e) => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >
              <AiOutlineCamera size={54} />
            </button>
          </div>
        ) : (
          <button
            aria-label="Editable"
            type="button"
            className="absolute z-10 inset-0 outline-none border-none w-full h-full block"
            onClick={onEdit}
          />
        )}
      </div>
    </div>
  );
}
