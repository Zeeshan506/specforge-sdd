import Link from "next/link";
import { redirect } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/user";
import { getIssues, getIssueCounts } from "@/server/queries/issues";
import { IssueFilterTabs } from "@/components/issues/IssueFilterTabs";
import { IssueList } from "@/components/issues/IssueList";

interface IssuesPageProps {
  searchParams?: {
    status?: string;
  };
}

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const statusFilter = searchParams?.status;
  const [issues, counts] = await Promise.all([
    getIssues(statusFilter),
    getIssueCounts(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Issues
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track, manage, and resolve project tasks and bugs
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
        <IssueFilterTabs counts={counts} />
        <IssueList issues={issues} />
      </div>
    </div>
  );
}
