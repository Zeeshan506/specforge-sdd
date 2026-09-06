"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2, CheckCircle2, RotateCcw } from "lucide-react";
import { toggleIssueStatus } from "@/server/actions/issues/update";
import { deleteIssue } from "@/server/actions/issues/delete";

interface IssueActionsProps {
  issueId: string;
  status: string;
}

export function IssueActions({ issueId, status }: IssueActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const isOpen = status === "OPEN";

  const handleToggleStatus = () => {
    setActionError(null);
    startTransition(async () => {
      const result = await toggleIssueStatus(issueId);
      if (!result.success) {
        setActionError(result.error || "Failed to update status.");
        return;
      }
      router.refresh();
    });
  };

  const handleDelete = () => {
    setActionError(null);
    startTransition(async () => {
      const result = await deleteIssue(issueId);
      if (!result.success) {
        setActionError(result.error || "Failed to delete issue.");
        return;
      }
      router.push("/issues");
      router.refresh();
    });
  };

  return (
    <div className="space-y-3">
      {actionError && (
        <div
          role="alert"
          className="p-3 text-sm text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800"
        >
          {actionError}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleToggleStatus}
          disabled={isPending}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${
            isOpen
              ? "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300 dark:hover:bg-purple-900"
              : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900"
          }`}
        >
          {isOpen ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>{isPending ? "Updating..." : "Close Issue"}</span>
            </>
          ) : (
            <>
              <RotateCcw className="h-4 w-4" />
              <span>{isPending ? "Updating..." : "Reopen Issue"}</span>
            </>
          )}
        </button>

        <Link
          href={`/issues/${issueId}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Link>

        {showDeleteConfirm ? (
          <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 p-1 border border-red-200 dark:border-red-800">
            <span className="text-xs font-medium text-red-700 dark:text-red-400 px-2">
              Confirm delete?
            </span>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="rounded bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50 transition"
            >
              {isPending ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isPending}
              className="rounded border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 dark:border-red-800 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
