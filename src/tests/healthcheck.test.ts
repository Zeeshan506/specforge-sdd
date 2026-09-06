import { describe, it, expect } from "vitest";

describe("Healthcheck & Environment Suite", () => {
  it("should verify Vitest runner execution", () => {
    expect(true).toBe(true);
  });

  it("should have DATABASE_URL defined", () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.DATABASE_URL).toContain("dev.db");
  });
});
