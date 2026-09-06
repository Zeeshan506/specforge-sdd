import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/user";
import { getIssueById } from "@/server/queries/issues";
import { IssueForm } from "@/components/issues/IssueForm";

interface EditIssuePageProps {
  params: {
    id: string;
  };
}

export default async function EditIssuePage({ params }: EditIssuePageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const issue = await getIssueById(params.id);

  if (!issue) {
    notFound();
  }

  if (issue.userId !== user.id) {
    redirect(`/issues/${issue.id}`);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href={`/issues/${issue.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Issue</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Edit Issue
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update the title, description, tags, or status of this issue
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm">
        <IssueForm
          initialData={{
            id: issue.id,
            title: issue.title,
            description: issue.description,
            status: issue.status,
            tags: issue.tags ? issue.tags.map((t) => t.name) : [],
          }}
        />
      </div>
    </div>
  );
}
