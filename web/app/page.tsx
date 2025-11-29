"use client";

import * as React from "react";

import { doCredentialLogin } from "@/lib/actions";
import { Logo } from "@/components/Logo";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // const x = useQuery()

  const onSubmit = async () => {
    try {
      // const callbackUrl = searchParams?.get("callbackUrl")∏;
      // await client.resetStore();

      const response = await doCredentialLogin({
        email,
        password,
      });

      console.log(response);

      // if (response) {
      //   console.log("error1", error);
      //   setError(response.error);
      // } else {
      //   reset();
      //   // // For solving not replacing login url with redirect url
      //   // callbackUrl && refresh();
      //   replace(callbackUrl ?? ROUTES.user.home);
      // }
    } catch (_error) {
      // setError((error as Error).message);
      // isDev() && console.error("Login@Errors: ", error);
    }
  };
  return (
    <div className="squi flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="mb-8">
          <Logo size={64} />
        </div>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="corner-squircle rounded-xl border"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </main>
    </div>
  );
}
