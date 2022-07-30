import { Button } from "@component";
import { FormControl } from "components/account";
import { UserLayout } from "components/Layout";
import { NextPage } from "next";
import Link from "next/link";
import { useId, useState } from "react";
import { ROUTES } from "utils/constants";

const className = {
  title:
    "border-b dark:border-base-dark-300 pb-2 my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "flex flex-col m-0 list-none",
  item: "py-8 flex flex-wrap sm:flex-nowrap items-center justify-between space-y-3",
  itemLeft: "flex-auto flex flex-col max-w-md pr-3",
  info: "text-neutral/60 dark:text-neutral-dark/60 text-sm mt-2",
  itemRight: "flex self-center shrink-0",
};

const SettingsPage: NextPage = () => {
  const [nameEdit, setNameEdit] = useState(false);
  const nameId = useId();
  return (
    <UserLayout>
      <h1 className={className.title}>About you</h1>
      <ul className={className.items}>
        <li className={className.item}>
          <div className={className.itemLeft}>
            <FormControl
              classes={{
                label: "text-left self-start font-bold !text-xl",
                input: "!text-left",
              }}
              id={nameId}
              title="Name"
              name="name"
              aria-label="name"
              aria-invalid={false}
              type="text"
              valid={true}
              errorText={""}
              value={"your name"}
              onChange={() => {}}
              onBlur={() => {}}
              disabled={!nameEdit}
            />
            <p className={className.info}>
              Your name appears on your{" "}
              <Link href={ROUTES.authorProfile("2")} passHref>
                <a aria-label="Profile" className="underline">
                  Profile
                </a>
              </Link>{" "}
              page, as your byline, and in your responses. It is a required
              field.
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
                onClick={() => {}}
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
      </ul>
    </UserLayout>
  );
};

export default SettingsPage;
