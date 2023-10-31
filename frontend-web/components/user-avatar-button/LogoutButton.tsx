"use client";

import * as React from "react";

import { useApolloClient } from "@apollo/client";
import { Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { useLogoutMutation } from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";
import { cn, gplErrorHandler } from "@/lib/utils";

import ErrorModal from "../ErrorModal";

export default function LogoutButton() {
  const [loading, setLoading] = React.useState(false);
  const client = useApolloClient();
  const [logout, { error, reset }] = useLogoutMutation({
    errorPolicy: "all",
  });

  const clickHandler = async () => {
    try {
      setLoading(true);
      await client.resetStore();
      await signOut();
      await logout();
    } catch (error) {
      isDev() && console.error("Logout errors: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Logout"
        className={cn(
          "flex w-full items-center border-none px-4 py-2 text-sm outline-none",
          loading ? "text-accent-disabled" : "text-neutral hover:text-accent",
        )}
        disabled={loading}
        onClick={clickHandler}
      >
        <LogOut size={18} />
        <span className="ml-2 mr-auto">Logout</span>
        {loading && (
          <Loader className="animate-spin text-secondary" size={18} />
        )}
      </button>
      <ErrorModal
        onClose={() => {
          reset();
          setLoading(false);
        }}
        title="Logout Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
