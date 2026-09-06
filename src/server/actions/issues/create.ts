"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/user";
import { createIssueSchema } from "@/lib/validations/issue";
import type { ActionResult } from "@/types/auth";

export async function createIssue(
  formData: unknown
): Promise<ActionResult<{ issueId: string }>> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to create an issue.",
    };
  }

  const parsed = createIssueSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check your inputs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { title, description } = parsed.data;

  const issue = await db.issue.create({
    data: {
      title,
      description: description || "",
      status: "OPEN",
      userId: user.id,
    },
  });

  revalidatePath("/issues");

  return {
    success: true,
    data: { issueId: issue.id },
  };
}
