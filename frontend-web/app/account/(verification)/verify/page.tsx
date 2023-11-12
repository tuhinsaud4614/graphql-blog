import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROUTES } from "@/lib/constants";

import VerifyAccountContent from "./_components/Content";

export const metadata: Metadata = {
  title: "The RAT Diary | User Verification",
};

export default async function VerifyAccountPage() {
  const session = await getServerSession(authOptions);
  if (session?.accessToken) {
    redirect(ROUTES.landing);
  }
  return <VerifyAccountContent />;
}
