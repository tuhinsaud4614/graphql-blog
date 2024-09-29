import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";
import { ROUTES } from "@/lib/constants";

import Register from "./_components/Register";

export const metadata: Metadata = {
  title: "The RAT Diary | Register",
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.accessToken) {
    redirect(ROUTES.landing);
  }
  return <Register />;
}
