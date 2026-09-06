import { db } from "@/lib/db";
import type { Tag } from "@prisma/client";

export interface TagWithCount extends Tag {
  _count?: {
    issues: number;
  };
}

/**
 * Retrieves all unique tags alphabetically sorted by name.
 */
export async function getAllTags(): Promise<TagWithCount[]> {
  return db.tag.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          issues: true,
        },
      },
    },
  });
}

/**
 * Retrieves a single tag by its unique name.
 */
export async function getTagByName(name: string): Promise<Tag | null> {
  const normalized = name.trim().toLowerCase();
  return db.tag.findUnique({
    where: {
      name: normalized,
    },
  });
}
