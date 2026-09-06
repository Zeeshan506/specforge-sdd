"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/auth/password";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import type { ActionResult } from "@/types/auth";

export async function registerUser(
  formData: unknown
): Promise<ActionResult<{ userId: string }>> {
  const parsed = registerSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  // Check for duplicate email
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  // Create user
  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  // Create database-backed session and set cookie
  const { sessionToken, expiresAt } = await createSession(user.id);
  setSessionCookie(sessionToken, expiresAt);

  return {
    success: true,
    data: { userId: user.id },
  };
}
