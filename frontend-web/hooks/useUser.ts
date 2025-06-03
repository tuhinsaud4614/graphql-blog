import { useSession } from "next-auth/react";

export default function useUser() {
  const { data } = useSession();
  return data?.user;
}
