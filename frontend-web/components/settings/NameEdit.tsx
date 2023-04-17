import * as React from "react";

import Link from "next/link";

import { toast } from "react-toastify";

import { Button, ErrorModal } from "@/components";
import { FormControl } from "@/components/account";
import { updateUserName } from "@/features";
import { useUpdateNameMutation } from "@/graphql/generated/schema";
import { useAppDispatch } from "@/store";
import { gplErrorHandler } from "@/utils";
import { ROUTES } from "@/utils/constants";
import { IUser } from "@/utils/interfaces";

const className = {
  item: "py-8 flex flex-wrap sm:flex-nowrap items-center justify-between space-y-3",
  itemLeft: "flex-auto flex flex-col max-w-md pr-3",
  info: "text-neutral/60 dark:text-neutral-dark/60 text-sm mt-2",
  itemRight: "flex self-start shrink-0",
};

interface Props {
  user: IUser | null;
}

export default function NameEdit({ user }: Props) {
  const [nameEdit, setNameEdit] = React.useState(false);
  const [name, setName] = React.useState(user?.name || "");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const nameId = React.useId();

  const rdxDispatch = useAppDispatch();
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
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            toastId: nameId,
          });
          rdxDispatch(updateUserName(data.updateName));
          setNameEdit(false);
        }
      } catch (error) {
        setName("");
      }
    }
  };

  return (
    <React.Fragment>
      <li className={className.item}>
        <div className={className.itemLeft}>
          <FormControl
            ref={inputRef}
            classes={{
              label: "text-left self-start font-bold !text-xl",
              input: "!text-left pb-2",
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
          <p className={className.info}>
            Your name appears on your{" "}
            <Link href={ROUTES.authorProfile("2")} passHref>
              <a aria-label="Profile" className="underline">
                Profile
              </a>
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
              disabled={loading}
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
      <ErrorModal
        onClose={() => reset()}
        title="Update name errors"
        errors={gplErrorHandler(error)}
      />
    </React.Fragment>
  );
}
