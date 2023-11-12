import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROUTES } from "@/lib/constants";

import Content from "./_components/Content";

export const metadata: Metadata = {
  title: "The RAT Diary | Reset Password Verification",
};

export default async function VerifyResetPasswordPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session?.accessToken) {
    redirect(ROUTES.landing);
  }
  return <Content />;
}
