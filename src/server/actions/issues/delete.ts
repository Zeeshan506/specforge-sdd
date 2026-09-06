"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/user";
import type { ActionResult } from "@/types/auth";

/**
 * Deletes an issue from the database.
 * Requires the authenticated user to be the issue author.
 */
export async function deleteIssue(
  issueId: string
): Promise<ActionResult<{ deletedId: string }>> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to delete an issue.",
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
      error: "You are not authorized to delete this issue.",
    };
  }

  await db.issue.delete({
    where: { id: issueId },
  });

  revalidatePath("/issues");

  return {
    success: true,
    data: { deletedId: issueId },
  };
}
