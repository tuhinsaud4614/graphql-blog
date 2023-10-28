import { Metadata } from "next";

import Login from "./_components/Login";

export const metadata: Metadata = {
  title: "The RAT Diary | Login",
};

export default function LoginPage() {
  return <Login />;
}
