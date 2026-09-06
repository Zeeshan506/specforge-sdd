import { describe, it, expect } from "vitest";
import {
  createIssueSchema,
  updateIssueSchema,
} from "@/lib/validations/issue";

describe("Issue Zod Validation Schemas", () => {
  describe("createIssueSchema", () => {
    it("should accept valid issue creation data", () => {
      const input = {
        title: "Fix responsive layout on mobile",
        description: "Navigation bar overlaps hero banner on small screens.",
      };

      const result = createIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe("Fix responsive layout on mobile");
        expect(result.data.description).toBe(
          "Navigation bar overlaps hero banner on small screens."
        );
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
    it("should accept valid update data with status", () => {
      const input = {
        title: "Updated Title",
        description: "Updated Description",
        status: "CLOSED",
      };

      const result = updateIssueSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.status).toBe("CLOSED");
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
});
