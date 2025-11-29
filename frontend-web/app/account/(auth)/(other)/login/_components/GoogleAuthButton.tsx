"use client";

import { useSearchParams } from "next/navigation";

import GoogleIcon from "@/components/svg/GoogleIcon";
import Button from "@/components/ui/Button";
import { BACKEND_API_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function GoogleLoginButton({ className }: Readonly<Props>) {
  const searchParams = useSearchParams();

  /**
   * Handles the click event of the Google login button.
   * Redirects the user to the Google login page with the redirect URL.
   */
  const clickHandler = () => {
    // Create a new URL object with the Google login API endpoint
    const uri = new URL(`${BACKEND_API_URL}/api/v1/users/google/login`);

    const callbackUrl = searchParams?.get("callbackUrl");

    // Append the redirect URL to the query parameters of the URL
    // The redirect URL is taken from the location state or defaults to "/"
    uri.searchParams.append(
      "redirectUrl",
      encodeURIComponent(`${callbackUrl || "/"}`),
    );

    // Redirect the user to the Google login page
    window.location.href = uri.href;
  };

  return (
    <Button
      variant="neutral"
      mode="outline"
      className={cn("w-full justify-center gap-2", className)}
      onClick={clickHandler}
      aria-label="Google Login"
    >
      <GoogleIcon size={16} />
      Login with Google
    </Button>
  );
}
