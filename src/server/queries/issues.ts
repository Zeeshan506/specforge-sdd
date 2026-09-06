import { db } from "@/lib/db";
import type { Issue } from "@prisma/client";

export interface IssueWithAuthor extends Issue {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IssueCounts {
  all: number;
  open: number;
  closed: number;
}

/**
 * Retrieves issues list with optional status filtering.
 */
export async function getIssues(
  statusFilter?: string
): Promise<IssueWithAuthor[]> {
  const whereClause: { status?: string } = {};

  if (statusFilter === "OPEN" || statusFilter === "CLOSED") {
    whereClause.status = statusFilter;
  }

  return db.issue.findMany({
    where: whereClause,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Retrieves a single issue by ID with its author information.
 */
export async function getIssueById(
  id: string
): Promise<IssueWithAuthor | null> {
  return db.issue.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

/**
 * Retrieves total issue counts broken down by status.
 */
export async function getIssueCounts(): Promise<IssueCounts> {
  const [all, open, closed] = await Promise.all([
    db.issue.count(),
    db.issue.count({ where: { status: "OPEN" } }),
    db.issue.count({ where: { status: "CLOSED" } }),
  ]);

  return { all, open, closed };
}
