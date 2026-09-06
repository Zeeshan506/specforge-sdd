import { z } from "zod";

export const issueStatusSchema = z.enum(["OPEN", "CLOSED"]);
export type IssueStatus = z.infer<typeof issueStatusSchema>;

export const tagSchema = z
  .string()
  .transform((val) => val.trim().toLowerCase())
  .pipe(
    z
      .string()
      .min(1, "Tag cannot be empty")
      .max(30, "Tag name cannot exceed 30 characters")
  );

export const tagListSchema = z
  .array(tagSchema)
  .transform((tags) => Array.from(new Set(tags.filter((t) => t.length > 0))))
  .pipe(z.array(z.string()).max(10, "Cannot add more than 10 tags per issue"));

export const createIssueSchema = z.object({
  title: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters")
    ),
  description: z
    .string()
    .optional()
    .default("")
    .transform((val) => (val ? val.trim() : ""))
    .pipe(z.string().max(2000, "Description cannot exceed 2000 characters")),
  tags: tagListSchema.optional().default([]),
});

export const updateIssueSchema = z.object({
  title: z
    .string()
    .transform((val) => val.trim())
    .pipe(
      z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters")
    ),
  description: z
    .string()
    .optional()
    .default("")
    .transform((val) => (val ? val.trim() : ""))
    .pipe(z.string().max(2000, "Description cannot exceed 2000 characters")),
  status: issueStatusSchema.optional(),
  tags: tagListSchema.optional(),
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;
