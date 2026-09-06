import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import type { User, Session } from "@prisma/client";

export const SESSION_COOKIE_NAME = "specforge_session";
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Generates a cryptographically random session token.
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Creates and persists a new session in SQLite for the specified user.
 */
export async function createSession(
  userId: string
): Promise<{ sessionToken: string; expiresAt: Date }> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db.session.create({
    data: {
      sessionToken,
      userId,
      expiresAt,
    },
  });

  return { sessionToken, expiresAt };
}

/**
 * Validates a session token against SQLite.
 * Automatically deletes expired sessions.
 */
export async function validateSessionToken(
  sessionToken: string
): Promise<{ session: Session; user: User } | null> {
  const sessionWithUser = await db.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!sessionWithUser) {
    return null;
  }

  // Check if session has expired
  if (Date.now() >= sessionWithUser.expiresAt.getTime()) {
    await db.session
      .delete({
        where: { id: sessionWithUser.id },
      })
      .catch(() => {
        // Ignore errors if already deleted concurrently
      });
    return null;
  }

  const { user, ...session } = sessionWithUser;
  return { session, user };
}

/**
 * Revokes / deletes a session from SQLite.
 */
export async function revokeSession(sessionToken: string): Promise<void> {
  await db.session.deleteMany({
    where: { sessionToken },
  });
}

/**
 * Sets the session cookie on the response.
 */
export function setSessionCookie(
  sessionToken: string,
  expiresAt: Date
): void {
  try {
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      path: "/",
    });
  } catch {
    // If called outside request context (e.g. tests)
  }
}

/**
 * Clears the session cookie.
 */
export function clearSessionCookie(): void {
  try {
    const cookieStore = cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });
  } catch {
    // If called outside request context (e.g. tests)
  }
}

/**
 * Retrieves the session token from active cookies.
 */
export function getSessionToken(): string | undefined {
  try {
    const cookieStore = cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
  } catch {
    return undefined;
  }
}
