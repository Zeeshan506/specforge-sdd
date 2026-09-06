import { getSessionToken, validateSessionToken } from "./session";

export interface SafeUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Retrieves the currently authenticated user from the active session cookie.
 * Returns null if unauthenticated or session is invalid/expired.
 */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const token = getSessionToken();
  if (!token) {
    return null;
  }

  const result = await validateSessionToken(token);
  if (!result) {
    return null;
  }

  const { passwordHash: _, ...safeUser } = result.user;
  return safeUser;
}
