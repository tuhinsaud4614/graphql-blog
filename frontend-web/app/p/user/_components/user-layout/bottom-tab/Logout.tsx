"use client";

import { LogOut } from "lucide-react";

import ErrorModal from "@/components/ErrorModal";
import useLogout from "@/hooks/useLogout";
import { gplErrorHandler } from "@/lib/utils";

export default function BottomTabLogout({ onClose }: { onClose(): void }) {
  const { error, loading, logoutHandler, reset } = useLogout();
  return (
    <>
      <li>
        <button
          type="button"
          aria-label="Logout"
          className="flex w-full items-center border-none px-4 py-2 text-neutral outline-none hover:bg-base-200 hover:text-accent dark:hover:text-base-300"
          disabled={loading}
          onClick={async () => {
            await logoutHandler();
            onClose();
          }}
        >
          <LogOut size={20} />
          <span className="ml-2">Logout</span>
        </button>
      </li>
      <ErrorModal
        onClose={() => reset()}
        title="Logout Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
