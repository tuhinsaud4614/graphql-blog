"use client";

import { Loader, LogOut } from "lucide-react";

import useLogout from "@/hooks/useLogout";
import { cn, gplErrorHandler } from "@/lib/utils";

import ErrorModal from "../ErrorModal";

export default function LogoutButton() {
  const { error, loading, logoutHandler, reset } = useLogout();

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
        onClick={logoutHandler}
      >
        <LogOut size={18} />
        <span className="ml-2 mr-auto">Logout</span>
        {loading && (
          <Loader className="animate-spin text-secondary" size={18} />
        )}
      </button>
      <ErrorModal
        onClose={() => reset()}
        title="Logout Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
