"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tag as TagIcon, X } from "lucide-react";
import type { TagWithCount } from "@/server/queries/tags";

interface TagFilterBarProps {
  tags: TagWithCount[];
}

export function TagFilterBar({ tags }: TagFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag")?.toLowerCase() || "";

  if (tags.length === 0) {
    return null;
  }

  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentTag === tagName.toLowerCase()) {
      params.delete("tag");
    } else {
      params.set("tag", tagName.toLowerCase());
    }

    const newUrl = params.toString() ? `/issues?${params.toString()}` : "/issues";
    router.push(newUrl);
  };

  const handleClearTag = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    const newUrl = params.toString() ? `/issues?${params.toString()}` : "/issues";
    router.push(newUrl);
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1 pb-2">
      <div className="flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">
        <TagIcon className="h-3.5 w-3.5" />
        <span>Tags:</span>
      </div>

      {currentTag && (
        <button
          type="button"
          onClick={handleClearTag}
          className="inline-flex items-center gap-1 rounded-full bg-gray-200 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          <span>All tags</span>
          <X className="h-3 w-3" />
        </button>
      )}

      {tags.map((tag) => {
        const isSelected = currentTag === tag.name.toLowerCase();

        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => handleTagClick(tag.name)}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition ${
              isSelected
                ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50"
            }`}
          >
            <span>#{tag.name}</span>
            {tag._count?.issues !== undefined && (
              <span
                className={`text-[10px] px-1 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-blue-700 text-blue-100"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                {tag._count.issues}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
