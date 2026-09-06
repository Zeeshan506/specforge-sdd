import { z } from "zod";

export const issueStatusSchema = z.enum(["OPEN", "CLOSED"]);
export type IssueStatus = z.infer<typeof issueStatusSchema>;

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
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;
