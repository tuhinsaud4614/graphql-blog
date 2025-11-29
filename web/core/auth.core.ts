import { Session } from "@/dto/user.dto";
import { Cookies } from "@/lib/types";
import crypto from "crypto";

export function createAuthSession(session: Session, cookies: Cookies) {
    const sessionId = crypto.randomBytes(512).toString("hex").normalize();

    cookies.set("session", sessionId, {
    })

}