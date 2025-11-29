"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { KEYS } from "@/lib/constants";

export async function GET(_req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.has(KEYS.SESSION_KEYS.accessToken) &&
      cookieStore.delete(KEYS.SESSION_KEYS.accessToken);
    cookieStore.has(KEYS.SESSION_KEYS.refreshToken) &&
      cookieStore.delete(KEYS.SESSION_KEYS.refreshToken);
    return NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to destroy session. Error: ", error);
    return NextResponse.json(
      { success: false },
      { status: 204, headers: { "Cache-Control": "no-store" } }
    );
  }
}
