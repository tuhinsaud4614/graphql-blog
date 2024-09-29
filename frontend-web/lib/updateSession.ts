import { useSession } from "next-auth/react";

import { IPicture } from "./types";

export interface UpdateSessionParams {
  name: string;
  avatar: IPicture | null;
  accessToken: string;
}

export async function updateSession<T extends Partial<UpdateSessionParams>>(
  params: T,
  update: ReturnType<typeof useSession>["update"],
) {
  if ((params && params.accessToken) || params.name || params.avatar) {
    return await update({ ...params });
  }
}
