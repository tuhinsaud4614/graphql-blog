import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROUTES } from "@/lib/constants";

import Login from "./_components/Login";

export const metadata: Metadata = {
  title: "The RAT Diary | Login",
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.accessToken) {
    redirect(ROUTES.landing);
  }
  return <Login />;
}
