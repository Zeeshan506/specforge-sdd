import { describe, it, expect } from "vitest";
import {
  createIssueSchema,
  updateIssueSchema,
  tagSchema,
  tagListSchema,
} from "@/lib/validations/issue";

describe("Issue Zod Validation Schemas", () => {
  describe("createIssueSchema", () => {
    it("should accept valid issue creation data with tags", () => {
      const input = {
        title: "Fix responsive layout on mobile",
        description: "Navigation bar overlaps hero banner on small screens.",
        tags: ["UI", "Frontend"],
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Fix responsive layout on mobile");
        expect(result.data.description).toBe(
          "Navigation bar overlaps hero banner on small screens."
        );
        expect(result.data.tags).toEqual(["ui", "frontend"]);
      }
    });

    it("should normalize and trim title and description whitespace", () => {
      const input = {
        title: "   Trimmed Title   ",
        description: "   Trimmed Description   ",
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Trimmed Title");
        expect(result.data.description).toBe("Trimmed Description");
        expect(result.data.tags).toEqual([]);
      }
    });

    it("should allow empty or omitted description and default to empty string", () => {
      const input = {
        title: "Title without description",
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBe("");
      }
    });

    it("should reject an empty title", () => {
      const input = {
        title: "    ",
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject title longer than 100 characters", () => {
      const input = {
        title: "a".repeat(101),
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it("should reject description longer than 2000 characters", () => {
      const input = {
        title: "Valid Title",
        description: "a".repeat(2001),
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("updateIssueSchema", () => {
    it("should accept valid update data with status and tags", () => {
      const input = {
        title: "Updated Title",
        description: "Updated Description",
        status: "CLOSED",
        tags: ["bug", "backend"],
      };

      const result = updateIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe("CLOSED");
        expect(result.data.tags).toEqual(["bug", "backend"]);
      }
    });

    it("should reject invalid status value", () => {
      const input = {
        title: "Valid Title",
        status: "INVALID_STATUS",
      };

      const result = updateIssueSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe("tagSchema and tagListSchema (AC-8)", () => {
    it("should normalize, trim, and lowercase tag names", () => {
      const result = tagSchema.safeParse("  Frontend-Bug  ");
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe("frontend-bug");
      }
    });

    it("should reject empty or whitespace-only tag strings", () => {
      const result = tagSchema.safeParse("   ");
      expect(result.success).toBe(false);
    });

    it("should reject tag names longer than 30 characters", () => {
      const result = tagSchema.safeParse("a".repeat(31));
      expect(result.success).toBe(false);
    });

    it("should deduplicate tags with different casing", () => {
      const result = tagListSchema.safeParse(["Bug", "BUG", "bug", "frontend"]);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(["bug", "frontend"]);
      }
    });

    it("should reject tag lists exceeding 10 tags", () => {
      const tags = Array.from({ length: 11 }, (_, i) => `tag-${i}`);
      const result = tagListSchema.safeParse(tags);
      expect(result.success).toBe(false);
    });
  });
});
