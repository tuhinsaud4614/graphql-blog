import { Button } from "components";
import Link from "next/link";
import { useState } from "react";
import { ROUTES } from "utils/constants";
import AvatarPicker from "./AvatarPicker";

const className = {
  item: "py-8 flex flex-wrap sm:flex-nowrap items-center justify-between space-y-3",
  itemLeft: "flex-auto flex flex-col mr-4",
  label: "mb-3 font-bold !text-xl text-neutral dark:text-neutral-dark",
  leftBottom: "flex justify-between",
  info: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
  itemRight: "flex self-start shrink-0",
};

export default function AvatarEdit() {
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  return (
    <li className={className.item}>
      <div className={className.itemLeft}>
        <label className={className.label}>Photo</label>
        <div className={className.leftBottom}>
          <div>
            <p className={className.info}>
              Your avatar appears on your{" "}
              <Link href={ROUTES.authorProfile("2")} passHref>
                <a aria-label="Profile" className="underline">
                  Profile
                </a>
              </Link>{" "}
              page and with your posts across Apps.
            </p>
            <br />
            <p className={className.info}>
              Recommended file size: 5MB. File type: JPG, JPEG, PNG, SVG, WEBP
              or GIF.
            </p>
          </div>
          <AvatarPicker
            editable={editable}
            image={image ? URL.createObjectURL(image) : "/demo.png"}
            onImageChange={(file) => {
              setImage(file);
            }}
            onEdit={() => setEditable(true)}
          />
        </div>
      </div>
      <div className={className.itemRight}>
        {editable && (
          <Button
            className="mr-2 text-sm"
            type="button"
            aria-label="Save"
            variant="success"
            mode="outline"
            onClick={() => {}}
            disabled={!image}
          >
            Save
          </Button>
        )}
        <Button
          className="text-sm"
          type="button"
          aria-label={editable ? "Cancel" : "Edit"}
          variant="neutral"
          mode="outline"
          onClick={() => setEditable((prev) => !prev)}
        >
          {editable ? "Cancel" : "Edit"}
        </Button>
      </div>
    </li>
  );
}
