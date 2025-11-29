import { useSession } from "@/components/providers/SessionProvider";

import { IAuthUser, IPicture } from "./types";

export interface UpdateSessionParams {
  name: string;
  avatar?: IPicture | null;
  about?: IAuthUser["about"];
  accessToken: string;
}

export function updateSession<T extends Partial<UpdateSessionParams>>(
  params: T,
  update: ReturnType<typeof useSession>["update"],
) {
  if (
    (params && params.accessToken) ||
    params.name ||
    params.avatar ||
    params.about
  ) {
    return update({ ...params });
  }
}
