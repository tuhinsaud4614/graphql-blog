import { useSession } from "@/components/providers/SessionProvider";

export default function useUser() {
  const { data } = useSession();
  return data?.user;
}
