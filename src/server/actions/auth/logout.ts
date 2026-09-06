"use server";

import { redirect } from "next/navigation";
import { getSessionToken, revokeSession, clearSessionCookie } from "@/lib/auth/session";
import type { ActionResult } from "@/types/auth";

export async function logoutUser(): Promise<ActionResult> {
  const token = getSessionToken();
  if (token) {
    await revokeSession(token);
  }
  clearSessionCookie();
  redirect("/login");
}
