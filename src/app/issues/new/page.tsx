import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/user";
import { IssueForm } from "@/components/issues/IssueForm";

export default async function NewIssuePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Issue
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Provide details about the bug, enhancement, or task
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-sm">
        <IssueForm />
      </div>
    </div>
  );
}
