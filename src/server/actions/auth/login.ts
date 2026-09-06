"use server";

import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validations/auth";
import { comparePassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import type { ActionResult } from "@/types/auth";

export async function loginUser(
  formData: unknown
): Promise<ActionResult<{ userId: string }>> {
  const parsed = loginSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  // Find user by email
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  // Verify password hash
  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  // Create database-backed session and set cookie
  const { sessionToken, expiresAt } = await createSession(user.id);
  setSessionCookie(sessionToken, expiresAt);

  return {
    success: true,
    data: { userId: user.id },
  };
}
