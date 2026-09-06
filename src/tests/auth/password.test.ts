import { describe, it, expect } from "vitest";
import { hashPassword, comparePassword } from "@/lib/auth/password";

describe("Password Authentication Utilities", () => {
  it("should securely hash a plaintext password and produce a non-empty string", async () => {
    const plaintext = "superSecret123!";
    const hash = await hashPassword(plaintext);

    expect(hash).toBeDefined();
    expect(typeof hash).toBe("string");
    expect(hash).not.toBe(plaintext);
    expect(hash.startsWith("$2")).toBe(true); // bcrypt hash prefix
  });

  it("should successfully compare a matching plaintext password with its hash", async () => {
    const plaintext = "securePassword2026";
    const hash = await hashPassword(plaintext);

    const isMatch = await comparePassword(plaintext, hash);
    expect(isMatch).toBe(true);
  });

  it("should reject a non-matching plaintext password against a hash", async () => {
    const plaintext = "correctPassword";
    const wrongPassword = "wrongPassword";
    const hash = await hashPassword(plaintext);

    const isMatch = await comparePassword(wrongPassword, hash);
    expect(isMatch).toBe(false);
  });

  it("should produce unique hashes for identical plaintext passwords due to unique salts", async () => {
    const plaintext = "samePasswordEverywhere";
    const hash1 = await hashPassword(plaintext);
    const hash2 = await hashPassword(plaintext);

    expect(hash1).not.toBe(hash2);
    expect(await comparePassword(plaintext, hash1)).toBe(true);
    expect(await comparePassword(plaintext, hash2)).toBe(true);
  });
});
