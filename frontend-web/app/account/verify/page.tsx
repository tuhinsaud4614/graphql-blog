import { Metadata } from "next";

import VerifyAccountContent from "./_components/Content";

export const metadata: Metadata = {
  title: "The RAT Diary | User Verification",
};

export default function VerifyAccountPage() {
  return <VerifyAccountContent />;
}
