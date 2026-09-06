import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/user";

export default async function IssuesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Issues Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back, {user.name} ({user.email})
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
        <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
          Protected Area Verified
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Authentication and SQLite session management are successfully active.
          Issue CRUD will be implemented in Phase 2.
        </p>
      </div>
    </div>
  );
}
