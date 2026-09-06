import { describe, it, expect } from "vitest";
import { db } from "@/lib/db";

describe("Database Connectivity Suite (AC-2)", () => {
  it("should successfully query the database using singleton Prisma client", async () => {
    const count = await db.systemHealth.count();
    expect(typeof count).toBe("number");
  });

  it("should create and retrieve a health check record", async () => {
    const record = await db.systemHealth.create({
      data: { status: "operational" },
    });
    expect(record.id).toBeDefined();
    expect(record.status).toBe("operational");

    const retrieved = await db.systemHealth.findUnique({
      where: { id: record.id },
    });
    expect(retrieved?.status).toBe("operational");

    // Clean up
    await db.systemHealth.delete({ where: { id: record.id } });
  });
});
