"use client";

import * as React from "react";

import Link from "next/link";

import _omit from "lodash/omit";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import { useUploadAvatarMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { IAuthUser } from "@/lib/types";
import { updateSession } from "@/lib/updateSession";
import { generateFileUrl, gplErrorHandler } from "@/lib/utils";

import AvatarPicker from "./AvatarPicker";

interface Props {
  user: IAuthUser;
  update: ReturnType<typeof useSession>["update"];
}

export default function AvatarEdit({ update, user }: Props) {
  const [editable, setEditable] = React.useState(false);
  const [image, setImage] = React.useState<File | null>(null);
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
          });
          await updateSession(
            { avatar: _omit(data.uploadAvatar, ["__typename"]) },
            update,
          );
          setEditable(false);
        }
      } catch (error) {
        setImage(null);
      }
    }
  };

  return (
    <>
      <li className="flex flex-wrap items-center justify-between space-y-3 py-8 sm:flex-nowrap">
        <div className="mr-4 flex flex-auto flex-col">
          <label className="mb-3 !text-xl font-bold text-neutral selection:bg-primary selection:text-primary-foreground">
            Photo
          </label>
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-neutral/60 selection:bg-primary selection:text-primary-foreground">
                Your avatar appears on your{" "}
                {user?.id ? (
                  <Link
                    href={ROUTES.user.userProfile(user.id)}
                    aria-label="Profile"
                    className="underline"
                  >
                    Profile
                  </Link>
                ) : (
                  "Profile"
                )}{" "}
                page and with your posts across Apps.
              </p>
              <br />
              <p className="flex shrink-0 self-start selection:bg-primary selection:text-primary-foreground">
                Recommended file size: 5MB. File type: JPG, JPEG, PNG, SVG, WEBP
                or GIF.
              </p>
            </div>

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
          </div>
        </div>
        <div className="flex shrink-0 self-start">
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
    </>
  );
}
