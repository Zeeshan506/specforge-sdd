import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "@/lib/db";
import {
  getIssues,
  getIssueById,
  getIssueCounts,
} from "@/server/queries/issues";

describe("Issue Database CRUD & Queries", () => {
  let testUserId: string;
  let anotherUserId: string;
  const createdIssueIds: string[] = [];

  beforeEach(async () => {
    const user1 = await db.user.create({
      data: {
        email: `author-${Date.now()}-${Math.random()}@example.com`,
        name: "Issue Author",
        passwordHash: "$2a$10$fakehashfortesting1234567890",
      },
    });
    testUserId = user1.id;

    const user2 = await db.user.create({
      data: {
        email: `other-${Date.now()}-${Math.random()}@example.com`,
        name: "Other User",
        passwordHash: "$2a$10$fakehashfortesting1234567890",
      },
    });
    anotherUserId = user2.id;
  });

  afterEach(async () => {
    // Cascade cleanup via user deletion
    if (testUserId) {
      await db.user.delete({ where: { id: testUserId } }).catch(() => {});
    }
    if (anotherUserId) {
      await db.user.delete({ where: { id: anotherUserId } }).catch(() => {});
    }
  });

  it("should create an issue with default OPEN status and author relation", async () => {
    const issue = await db.issue.create({
      data: {
        title: "Test Issue 1",
        description: "Test Description",
        userId: testUserId,
      },
    });
    createdIssueIds.push(issue.id);

    expect(issue.id).toBeDefined();
    expect(issue.title).toBe("Test Issue 1");
    expect(issue.status).toBe("OPEN");
    expect(issue.userId).toBe(testUserId);
  });

  it("should retrieve an issue by ID including author name and email", async () => {
    const created = await db.issue.create({
      data: {
        title: "Detail Test Issue",
        description: "Detail content",
        userId: testUserId,
      },
    });
    createdIssueIds.push(created.id);

    const fetched = await getIssueById(created.id);
    expect(fetched).not.toBeNull();
    expect(fetched?.id).toBe(created.id);
    expect(fetched?.user.name).toBe("Issue Author");
    expect(fetched?.user.id).toBe(testUserId);
  });

  it("should filter issues by OPEN and CLOSED status accurately", async () => {
    const openIssue = await db.issue.create({
      data: {
        title: "Open Issue",
        status: "OPEN",
        userId: testUserId,
      },
    });
    const closedIssue = await db.issue.create({
      data: {
        title: "Closed Issue",
        status: "CLOSED",
        userId: testUserId,
      },
    });
    createdIssueIds.push(openIssue.id, closedIssue.id);

    const openList = await getIssues("OPEN");
    const openIds = openList.map((i) => i.id);
    expect(openIds).toContain(openIssue.id);
    expect(openIds).not.toContain(closedIssue.id);

    const closedList = await getIssues("CLOSED");
    const closedIds = closedList.map((i) => i.id);
    expect(closedIds).toContain(closedIssue.id);
    expect(closedIds).not.toContain(openIssue.id);

    const allList = await getIssues("ALL");
    const allIds = allList.map((i) => i.id);
    expect(allIds).toContain(openIssue.id);
    expect(allIds).toContain(closedIssue.id);
  });

  it("should compute accurate issue counts broken down by status", async () => {
    await db.issue.create({
      data: { title: "Count Open", status: "OPEN", userId: testUserId },
    });
    await db.issue.create({
      data: { title: "Count Closed", status: "CLOSED", userId: testUserId },
    });

    const counts = await getIssueCounts();
    expect(counts.all).toBeGreaterThanOrEqual(2);
    expect(counts.open).toBeGreaterThanOrEqual(1);
    expect(counts.closed).toBeGreaterThanOrEqual(1);
  });

  it("should update an issue and toggle its status", async () => {
    const issue = await db.issue.create({
      data: {
        title: "Initial Title",
        description: "Initial Description",
        status: "OPEN",
        userId: testUserId,
      },
    });

    const updated = await db.issue.update({
      where: { id: issue.id },
      data: {
        title: "Updated Title",
        status: "CLOSED",
      },
    });

    expect(updated.title).toBe("Updated Title");
    expect(updated.status).toBe("CLOSED");
  });

  it("should delete an issue from the database", async () => {
    const issue = await db.issue.create({
      data: {
        title: "To Be Deleted",
        userId: testUserId,
      },
    });

    await db.issue.delete({
      where: { id: issue.id },
    });

    const result = await getIssueById(issue.id);
    expect(result).toBeNull();
  });
});
