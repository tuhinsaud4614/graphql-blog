"use client";

import * as React from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";

import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useUpdateNameMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { IAuthUser } from "@/lib/types";
import { updateSession } from "@/lib/updateSession";
import { cn, gplErrorHandler } from "@/lib/utils";

const className = {
  item: "py-8 flex flex-wrap sm:flex-nowrap items-center justify-between space-y-3",
  itemLeft: "flex-auto flex flex-col max-w-md pr-3",
  info: "text-neutral/60 selection:text-primary-foreground selection:bg-primary text-sm mt-2",
  itemRight: "flex self-start shrink-0",
};

interface Props {
  user: IAuthUser;
  update: ReturnType<typeof useSession>["update"];
}

export default function NameEdit({ user, update }: Props) {
  const [nameEdit, setNameEdit] = React.useState(false);
  const [name, setName] = React.useState(user.name || "");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const nameId = React.useId();

  const [updateName, { loading, error, reset }] = useUpdateNameMutation({
    fetchPolicy: "network-only",
    errorPolicy: "all",
  });

  React.useEffect(() => {
    const inputEle = inputRef.current;
    if (nameEdit && inputEle) {
      inputEle.focus();
      inputEle.selectionStart = inputEle.value.length;
      inputEle.selectionEnd = inputEle.value.length;
    }
  }, [nameEdit]);

  const submitHandler = async () => {
    const newName = name.trim();

    if (newName) {
      try {
        const { data } = await updateName({
          variables: { name: newName },
        });
        if (data) {
          toast.success("Update name successfully.", {
            position: "top-center",
            id: nameId,
          });
          await updateSession({ name: data.updateName }, update);
          setNameEdit(false);
        }
      } catch (error) {
        setName("");
      }
    }
  };

  return (
    <>
      <li className={className.item}>
        <div className={className.itemLeft}>
          <Input
            ref={inputRef}
            classes={{
              label: "text-left self-start font-bold !text-xl ",
              box: cn(
                !nameEdit &&
                  "selection:text-primary-foreground selection:bg-primary",
              ),
              input: "pb-2 !text-left",
            }}
            placeholder="Your name here..."
            id={nameId}
            title="Name"
            name="name"
            aria-label="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            disabled={!nameEdit}
          />
          <p className="selection:text-primary-foreground mt-2 text-sm text-neutral/60 selection:bg-primary">
            Your name appears on your{" "}
            <Link
              href={ROUTES.user.userProfile(user.id)}
              aria-label="Profile"
              className="underline"
            >
              Profile
            </Link>{" "}
            page, as your byline, and in your responses. It is a required field.
          </p>
        </div>
        <div className={className.itemRight}>
          {nameEdit && (
            <Button
              className="mr-2 text-sm"
              type="button"
              aria-label="Save"
              variant="success"
              mode="outline"
              onClick={submitHandler}
              disabled={loading || !name}
              loading={loading}
            >
              Save
            </Button>
          )}
          <Button
            className="text-sm"
            type="button"
            aria-label={nameEdit ? "Cancel" : "Edit"}
            variant="neutral"
            mode="outline"
            onClick={() => setNameEdit((prev) => !prev)}
          >
            {nameEdit ? "Cancel" : "Edit"}
          </Button>
        </div>
      </li>
      <Toaster richColors />
      <ErrorModal
        onClose={() => reset()}
        title="Update name errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
