import { db } from "@/lib/db";
import type { Issue, Tag } from "@prisma/client";

export interface IssueWithDetails extends Issue {
  user: {
    id: string;
    name: string;
    email: string;
  };
  tags: Tag[];
}

export type IssueWithAuthor = IssueWithDetails;

export interface IssueCounts {
  all: number;
  open: number;
  closed: number;
}

export interface GetIssuesOptions {
  status?: string;
  q?: string;
  tag?: string;
}

/**
 * Retrieves issues list with optional search, tag, and status filtering.
 */
export async function getIssues(
  optionsOrStatus?: GetIssuesOptions | string
): Promise<IssueWithDetails[]> {
  const options: GetIssuesOptions =
    typeof optionsOrStatus === "string"
      ? { status: optionsOrStatus }
      : optionsOrStatus || {};

  const whereClause: {
    status?: string;
    OR?: Array<{ title?: { contains: string }; description?: { contains: string } }>;
    tags?: { some: { name: string } };
  } = {};

  if (options.status === "OPEN" || options.status === "CLOSED") {
    whereClause.status = options.status;
  }

  const query = options.q?.trim();
  if (query) {
    whereClause.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
    ];
  }

  const tagFilter = options.tag?.trim().toLowerCase();
  if (tagFilter) {
    whereClause.tags = {
      some: {
        name: tagFilter,
      },
    };
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
      tags: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Retrieves a single issue by ID with its author and tags.
 */
export async function getIssueById(
  id: string
): Promise<IssueWithDetails | null> {
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
      tags: {
        orderBy: {
          name: "asc",
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
