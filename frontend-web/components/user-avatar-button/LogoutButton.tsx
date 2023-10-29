"use client";

import { LogOut } from "lucide-react";

import useAuthLogout from "@/hooks/useAuth";
import { gplErrorHandler } from "@/lib/utils";

import ErrorModal from "../ErrorModal";

export default function LogoutButton() {
  const { error, loading, logoutHandler, reset } = useAuthLogout();
  return (
    <>
      <button
        type="button"
        aria-label="Logout"
        className="flex w-full items-center border-none px-4 py-2 text-sm text-neutral outline-none hover:bg-base-200 hover:text-accent"
        disabled={loading}
        onClick={logoutHandler}
      >
        <LogOut size={18} />
        <span className="ml-2">Logout</span>
      </button>
      <ErrorModal
        onClose={reset}
        title="Logout Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
