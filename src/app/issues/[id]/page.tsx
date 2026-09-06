import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CircleDot, CheckCircle2, ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/user";
import { getIssueById } from "@/server/queries/issues";
import { IssueActions } from "@/components/issues/IssueActions";
import { TagBadge } from "@/components/issues/TagBadge";

interface IssueDetailPageProps {
  params: {
    id: string;
  };
}

export default async function IssueDetailPage({ params }: IssueDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const issue = await getIssueById(params.id);

  if (!issue) {
    notFound();
  }

  const isAuthor = user.id === issue.userId;
  const isOpen = issue.status === "OPEN";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/issues"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Issues</span>
      </Link>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {issue.title}
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                isOpen
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                  : "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
              }`}
            >
              {isOpen ? (
                <>
                  <CircleDot className="h-4 w-4" />
                  <span>Open</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Closed</span>
                </>
              )}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Opened by <strong className="text-gray-700 dark:text-gray-300">{issue.user.name}</strong></span>
            <span>•</span>
            <span>
              {new Date(issue.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {issue.updatedAt > issue.createdAt && (
              <>
                <span>•</span>
                <span className="italic">
                  Updated{" "}
                  {new Date(issue.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </>
            )}
          </div>

          {issue.tags && issue.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {issue.tags.map((tag) => (
                <TagBadge
                  key={tag.id}
                  name={tag.name}
                  size="md"
                  href={`/issues?tag=${encodeURIComponent(tag.name)}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Description
          </h2>
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed text-base">
            {issue.description ? (
              issue.description
            ) : (
              <p className="italic text-gray-400">No description provided.</p>
            )}
          </div>
        </div>

        {isAuthor && (
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <IssueActions issueId={issue.id} status={issue.status} />
          </div>
        )}
      </div>
    </div>
  );
}
