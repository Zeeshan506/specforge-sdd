import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "@/lib/db";
import {
  generateSessionToken,
  createSession,
  validateSessionToken,
  revokeSession,
} from "@/lib/auth/session";

describe("Database Session Utilities", () => {
  let testUserId: string;

  beforeEach(async () => {
    // Create a temporary test user
    const user = await db.user.create({
      data: {
        email: `test-${Date.now()}-${Math.random()}@example.com`,
        name: "Test User",
        passwordHash: "$2a$10$fakehashfortestingpurposesonly1234567890",
      },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    // Clean up test user and cascade-delete sessions
    if (testUserId) {
      await db.user.delete({ where: { id: testUserId } }).catch(() => {});
    }
  });

  it("should generate cryptographically secure unique session tokens", () => {
    const token1 = generateSessionToken();
    const token2 = generateSessionToken();

    expect(token1).toBeDefined();
    expect(typeof token1).toBe("string");
    expect(token1.length).toBe(64); // 32 bytes hex
    expect(token1).not.toBe(token2);
  });

  it("should create a database-backed session in SQLite and validate it", async () => {
    const { sessionToken, expiresAt } = await createSession(testUserId);

    expect(sessionToken).toBeDefined();
    expect(expiresAt.getTime()).toBeGreaterThan(Date.now());

    // Validate the token
    const result = await validateSessionToken(sessionToken);
    expect(result).not.toBeNull();
    expect(result?.user.id).toBe(testUserId);
    expect(result?.session.sessionToken).toBe(sessionToken);
  });

  it("should return null when validating an invalid or non-existent token", async () => {
    const result = await validateSessionToken("non-existent-token-12345");
    expect(result).toBeNull();
  });

  it("should revoke and delete an active session from SQLite", async () => {
    const { sessionToken } = await createSession(testUserId);

    // Revoke
    await revokeSession(sessionToken);

    // Validate should now return null
    const result = await validateSessionToken(sessionToken);
    expect(result).toBeNull();
  });

  it("should reject and automatically remove an expired session", async () => {
    const expiredToken = generateSessionToken();
    const pastDate = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago

    await db.session.create({
      data: {
        sessionToken: expiredToken,
        userId: testUserId,
        expiresAt: pastDate,
      },
    });

    const result = await validateSessionToken(expiredToken);
    expect(result).toBeNull();

    // Confirm it was cleaned up
    const dbRecord = await db.session.findUnique({
      where: { sessionToken: expiredToken },
    });
    expect(dbRecord).toBeNull();
  });
});
