"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createIssue } from "@/server/actions/issues/create";
import { updateIssue } from "@/server/actions/issues/update";

interface IssueFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
}

export function IssueForm({ initialData }: IssueFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "OPEN");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsPending(true);

    try {
      if (isEditing && initialData) {
        const result = await updateIssue(initialData.id, {
          title,
          description,
          status,
        });

        if (!result.success) {
          setError(result.error || "Failed to update issue.");
          if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors);
          }
          return;
        }

        router.push(`/issues/${initialData.id}`);
        router.refresh();
      } else {
        const result = await createIssue({
          title,
          description,
        });

        if (!result.success) {
          setError(result.error || "Failed to create issue.");
          if (result.fieldErrors) {
            setFieldErrors(result.fieldErrors);
          }
          return;
        }

        if (result.data?.issueId) {
          router.push(`/issues/${result.data.issueId}`);
        } else {
          router.push("/issues");
        }
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          role="alert"
          className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800"
        >
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          required
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of the issue"
          className="w-full px-3.5 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
        {fieldErrors.title?.[0] && (
          <p className="mt-1 text-xs text-red-600">{fieldErrors.title[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={6}
          maxLength={2000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed explanation, reproduction steps, or context..."
          className="w-full px-3.5 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
        {fieldErrors.description?.[0] && (
          <p className="mt-1 text-xs text-red-600">
            {fieldErrors.description[0]}
          </p>
        )}
      </div>

      {isEditing && (
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          >
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition shadow"
        >
          {isPending
            ? isEditing
              ? "Saving changes..."
              : "Creating issue..."
            : isEditing
            ? "Save Changes"
            : "Create Issue"}
        </button>

        <Link
          href={isEditing && initialData ? `/issues/${initialData.id}` : "/issues"}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
