import Link from "next/link";
import { CircleDot, CheckCircle2, PlusCircle, SearchX } from "lucide-react";
import type { IssueWithDetails } from "@/server/queries/issues";
import { TagBadge } from "@/components/issues/TagBadge";

interface IssueListProps {
  issues: IssueWithDetails[];
  hasActiveFilters?: boolean;
}

export function IssueList({ issues, hasActiveFilters = false }: IssueListProps) {
  if (issues.length === 0) {
    if (hasActiveFilters) {
      return (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
          <SearchX className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            No matching issues found
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search terms or clearing active filters.
          </p>
          <div className="mt-6">
            <Link
              href="/issues"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <span>Reset all filters</span>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
        <CircleDot className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No issues found
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new issue to track your project tasks.
        </p>
        <div className="mt-6">
          <Link
            href="/issues/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create First Issue</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm divide-y divide-gray-100 dark:divide-gray-800">
      {issues.map((issue) => {
        const isOpen = issue.status === "OPEN";

        return (
          <div
            key={issue.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <span className="mt-0.5 shrink-0">
                {isOpen ? (
                  <CircleDot className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                )}
              </span>

              <div className="min-w-0 space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/issues/${issue.id}`}
                    className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition truncate"
                  >
                    {issue.title}
                  </Link>
                  {issue.tags && issue.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {issue.tags.map((tag) => (
                        <TagBadge
                          key={tag.id}
                          name={tag.name}
                          href={`/issues?tag=${encodeURIComponent(tag.name)}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      isOpen
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                        : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
                    }`}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </span>
                  <span>•</span>
                  <span>Opened by {issue.user.name}</span>
                  <span>•</span>
                  <span>
                    {new Date(issue.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/issues/${issue.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 shrink-0 ml-4"
            >
              View →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
