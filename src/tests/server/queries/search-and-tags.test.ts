import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { db } from "@/lib/db";
import { getIssues, getIssueById } from "@/server/queries/issues";
import { getAllTags, getTagByName } from "@/server/queries/tags";

describe("Tagging & Search Query Subsystem", () => {
  let testUserId: string;

  beforeEach(async () => {
    const user = await db.user.create({
      data: {
        email: `search-test-${Date.now()}-${Math.random()}@example.com`,
        name: "Search Tester",
        passwordHash: "$2a$10$fakehashfortesting1234567890",
      },
    });
    testUserId = user.id;
  });

  afterEach(async () => {
    if (testUserId) {
      await db.user.delete({ where: { id: testUserId } }).catch(() => {});
    }
  });

  it("should create tags and associate them with an issue (AC-1)", async () => {
    const issue = await db.issue.create({
      data: {
        title: "Frontend Crash Bug",
        description: "App crashes when clicking navbar on Safari",
        userId: testUserId,
        tags: {
          connectOrCreate: [
            { where: { name: "bug" }, create: { name: "bug" } },
            { where: { name: "frontend" }, create: { name: "frontend" } },
          ],
        },
      },
      include: {
        tags: true,
      },
    });

    expect(issue.tags).toHaveLength(2);
    const tagNames = issue.tags.map((t) => t.name);
    expect(tagNames).toContain("bug");
    expect(tagNames).toContain("frontend");

    const fetched = await getIssueById(issue.id);
    expect(fetched?.tags.map((t) => t.name)).toEqual(
      expect.arrayContaining(["bug", "frontend"])
    );
  });

  it("should detach a tag from an issue without deleting the tag entity (AC-2)", async () => {
    const issue = await db.issue.create({
      data: {
        title: "Backend API Auth Issue",
        userId: testUserId,
        tags: {
          connectOrCreate: [
            { where: { name: "security" }, create: { name: "security" } },
            { where: { name: "api" }, create: { name: "api" } },
          ],
        },
      },
    });

    // Detach 'security' tag, keep only 'api'
    await db.issue.update({
      where: { id: issue.id },
      data: {
        tags: {
          set: [],
          connectOrCreate: [{ where: { name: "api" }, create: { name: "api" } }],
        },
      },
    });

    const updatedIssue = await getIssueById(issue.id);
    expect(updatedIssue?.tags.map((t) => t.name)).toEqual(["api"]);

    // Verify 'security' tag still exists in the global Tag table
    const securityTag = await getTagByName("security");
    expect(securityTag).not.toBeNull();
    expect(securityTag?.name).toBe("security");
  });

  it("should search issues by title and description substring (AC-4)", async () => {
    const issue1 = await db.issue.create({
      data: {
        title: "Fix PostgreSQL connection timeout",
        description: "Occurs under heavy concurrency",
        userId: testUserId,
      },
    });

    const issue2 = await db.issue.create({
      data: {
        title: "Implement UI dark theme toggle",
        description: "Users requested dark mode support in PostgreSQL database settings",
        userId: testUserId,
      },
    });

    const issue3 = await db.issue.create({
      data: {
        title: "Refactor router handlers",
        description: "Clean up legacy code",
        userId: testUserId,
      },
    });

    // Search by title match ("timeout")
    const timeoutResults = await getIssues({ q: "timeout" });
    const timeoutIds = timeoutResults.map((i) => i.id);
    expect(timeoutIds).toContain(issue1.id);
    expect(timeoutIds).not.toContain(issue2.id);
    expect(timeoutIds).not.toContain(issue3.id);

    // Search by description match ("PostgreSQL")
    const dbResults = await getIssues({ q: "postgresql" });
    const dbIds = dbResults.map((i) => i.id);
    expect(dbIds).toContain(issue1.id);
    expect(dbIds).toContain(issue2.id);
    expect(dbIds).not.toContain(issue3.id);
  });

  it("should filter issues by specific tag (AC-5)", async () => {
    const issueWithTag = await db.issue.create({
      data: {
        title: "Mobile navigation glitch",
        userId: testUserId,
        tags: {
          connectOrCreate: [{ where: { name: "mobile" }, create: { name: "mobile" } }],
        },
      },
    });

    const issueWithoutTag = await db.issue.create({
      data: {
        title: "Desktop sidebar glitch",
        userId: testUserId,
      },
    });

    const filtered = await getIssues({ tag: "mobile" });
    const filteredIds = filtered.map((i) => i.id);
    expect(filteredIds).toContain(issueWithTag.id);
    expect(filteredIds).not.toContain(issueWithoutTag.id);
  });

  it("should support combined multi-criteria filtering: q + tag + status (AC-6)", async () => {
    const targetIssue = await db.issue.create({
      data: {
        title: "Critical payment webhook failure",
        description: "Stripe webhook signature validation fails",
        status: "OPEN",
        userId: testUserId,
        tags: {
          connectOrCreate: [{ where: { name: "billing" }, create: { name: "billing" } }],
        },
      },
    });

    const closedBillingIssue = await db.issue.create({
      data: {
        title: "Payment webhook retry logic",
        description: "Stripe webhook retry exponential backoff",
        status: "CLOSED",
        userId: testUserId,
        tags: {
          connectOrCreate: [{ where: { name: "billing" }, create: { name: "billing" } }],
        },
      },
    });

    const openNonBillingIssue = await db.issue.create({
      data: {
        title: "Payment gateway documentation update",
        description: "Update developer docs for webhook integration",
        status: "OPEN",
        userId: testUserId,
      },
    });

    const matches = await getIssues({
      q: "webhook",
      tag: "billing",
      status: "OPEN",
    });

    const matchIds = matches.map((i) => i.id);
    expect(matchIds).toContain(targetIssue.id);
    expect(matchIds).not.toContain(closedBillingIssue.id);
    expect(matchIds).not.toContain(openNonBillingIssue.id);
  });

  it("should list all unique tags via getAllTags query", async () => {
    await db.tag.createMany({
      data: [
        { name: "tag-alpha" },
        { name: "tag-beta" },
      ],
    }).catch(() => {});

    const allTags = await getAllTags();
    const names = allTags.map((t) => t.name);
    expect(names).toContain("tag-alpha");
    expect(names).toContain("tag-beta");
  });
});
