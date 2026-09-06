"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/user";
import { updateIssueSchema } from "@/lib/validations/issue";
import type { ActionResult } from "@/types/auth";

/**
 * Updates an issue's title, description, or status.
 * Requires the authenticated user to be the issue author.
 */
export async function updateIssue(
  issueId: string,
  formData: unknown
): Promise<ActionResult<{ issueId: string }>> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to update an issue.",
    };
  }

  const existing = await db.issue.findUnique({
    where: { id: issueId },
  });

  if (!existing) {
    return {
      success: false,
      error: "Issue not found.",
    };
  }

  if (existing.userId !== user.id) {
    return {
      success: false,
      error: "You are not authorized to edit this issue.",
    };
  }

  const parsed = updateIssueSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { title, description, status } = parsed.data;

  await db.issue.update({
    where: { id: issueId },
    data: {
      title,
      description: description ?? existing.description,
      status: status ?? existing.status,
    },
  });

  revalidatePath("/issues");
  revalidatePath(`/issues/${issueId}`);

  return {
    success: true,
    data: { issueId },
  };
}

/**
 * Toggles an issue's status between OPEN and CLOSED.
 * Requires the authenticated user to be the issue author.
 */
export async function toggleIssueStatus(
  issueId: string
): Promise<ActionResult<{ newStatus: string }>> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to modify issue status.",
    };
  }

  const existing = await db.issue.findUnique({
    where: { id: issueId },
  });

  if (!existing) {
    return {
      success: false,
      error: "Issue not found.",
    };
  }

  if (existing.userId !== user.id) {
    return {
      success: false,
      error: "You are not authorized to modify this issue's status.",
    };
  }

  const newStatus = existing.status === "OPEN" ? "CLOSED" : "OPEN";

  await db.issue.update({
    where: { id: issueId },
    data: { status: newStatus },
  });

  revalidatePath("/issues");
  revalidatePath(`/issues/${issueId}`);

  return {
    success: true,
    data: { newStatus },
  };
}
