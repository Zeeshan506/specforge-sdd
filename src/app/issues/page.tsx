import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/user";
import { getIssues, getIssueCounts } from "@/server/queries/issues";
import { getAllTags } from "@/server/queries/tags";
import { IssueFilterTabs } from "@/components/issues/IssueFilterTabs";
import { IssueSearchBar } from "@/components/issues/IssueSearchBar";
import { TagFilterBar } from "@/components/issues/TagFilterBar";
import { IssueList } from "@/components/issues/IssueList";

interface IssuesPageProps {
  searchParams?: {
    status?: string;
    q?: string;
    tag?: string;
  };
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const [issues, counts, allTags] = await Promise.all([
    getIssues({
      status: searchParams?.status,
      q: searchParams?.q,
      tag: searchParams?.tag,
    }),
    getIssueCounts(),
    getAllTags(),
  ]);

  const hasActiveFilters = Boolean(
    searchParams?.status || searchParams?.q || searchParams?.tag
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Issues
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track, manage, search, and resolve project tasks and bugs
          </p>
        </div>

        <Link
          href="/issues/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition shadow"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Issue</span>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <IssueSearchBar />
        </div>

        <IssueFilterTabs counts={counts} />
        <TagFilterBar tags={allTags} />
        <IssueList issues={issues} hasActiveFilters={hasActiveFilters} />
      </div>
    </div>
  );
}
