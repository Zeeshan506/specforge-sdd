import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema } from "@/lib/validations/auth";

describe("Auth Zod Validation Schemas", () => {
  describe("registerSchema", () => {
    it("should accept valid registration input", () => {
      const input = {
        name: "Alice Developer",
        email: "alice@example.com",
        password: "password123",
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("alice@example.com");
      }
    });

    it("should normalize email by trimming and converting to lowercase", () => {
      const input = {
        name: "Bob Builder",
        email: "  BOB@Example.COM  ",
        password: "password123",
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("bob@example.com");
      }
    });

    it("should reject invalid email format", () => {
      const input = {
        name: "Charlie",
        email: "not-an-email",
        password: "password123",
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject password shorter than 8 characters", () => {
      const input = {
        name: "David",
        email: "david@example.com",
        password: "short",
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const input = {
        name: "   ",
        email: "empty@example.com",
        password: "password123",
      };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("loginSchema", () => {
    it("should accept valid login input", () => {
      const input = {
        email: "alice@example.com",
        password: "password123",
      };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it("should normalize email on login", () => {
      const input = {
        email: " ALICE@EXAMPLE.COM ",
        password: "password123",
      };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("alice@example.com");
      }
    });

    it("should reject empty password", () => {
      const input = {
        email: "alice@example.com",
        password: "",
      };
      const result = loginSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
