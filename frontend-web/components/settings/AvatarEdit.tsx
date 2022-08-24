import _ from "lodash";
import Link from "next/link";
import { Fragment, useState } from "react";

import { selectUser, updateUserAvatar } from "@features";
import { Button, ClientOnly, ErrorModal } from "components";
import { useUploadAvatarMutation } from "graphql/generated/schema";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store";
import { generateFileUrl, gplErrorHandler } from "utils";
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
  const user = useAppSelector(selectUser);
  const rdxDispatch = useAppDispatch();
  const [uploadMutation, { error, loading, reset }] = useUploadAvatarMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  const saveHandler = async () => {
    if (image) {
      try {
        const { data } = await uploadMutation({ variables: { avatar: image } });
        if (data) {
          toast.success("Upload avatar successfully.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          rdxDispatch(
            updateUserAvatar(_.omit(data.uploadAvatar, ["__typename"]))
          );
          setEditable(false);
        }
      } catch (error) {
        setImage(null);
      }
    }
  };

  return (
    <Fragment>
      <li className={className.item}>
        <div className={className.itemLeft}>
          <label className={className.label}>Photo</label>
          <div className={className.leftBottom}>
            <div>
              <p className={className.info}>
                Your avatar appears on your{" "}
                <ClientOnly>
                  {user?.id ? (
                    <Link href={ROUTES.authorProfile(user.id)} passHref>
                      <a aria-label="Profile" className="underline">
                        Profile
                      </a>
                    </Link>
                  ) : (
                    "Profile"
                  )}
                </ClientOnly>{" "}
                page and with your posts across Apps.
              </p>
              <br />
              <p className={className.info}>
                Recommended file size: 5MB. File type: JPG, JPEG, PNG, SVG, WEBP
                or GIF.
              </p>
            </div>
            <ClientOnly>
              <AvatarPicker
                editable={editable}
                image={
                  image
                    ? URL.createObjectURL(image)
                    : generateFileUrl(user?.avatar?.url)
                }
                onImageChange={(file) => {
                  setImage(file);
                }}
                onEdit={() => setEditable(true)}
              />
            </ClientOnly>
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
              onClick={saveHandler}
              disabled={!image || loading}
              loading={loading}
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
            onClick={() => {
              setEditable((prev) => !prev);
              setImage(null);
            }}
          >
            {editable ? "Cancel" : "Edit"}
          </Button>
        </div>
      </li>
      <ErrorModal
        onClose={() => reset()}
        title="Avatar upload errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
}
