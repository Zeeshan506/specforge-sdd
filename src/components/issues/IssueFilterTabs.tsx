"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { IssueCounts } from "@/server/queries/issues";

interface IssueFilterTabsProps {
  counts: IssueCounts;
}

export function IssueFilterTabs({ counts }: IssueFilterTabsProps) {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "ALL";

  const tabs = [
    { label: "All Issues", value: "ALL", count: counts.all, href: "/issues" },
    {
      label: "Open",
      value: "OPEN",
      count: counts.open,
      href: "/issues?status=OPEN",
    },
    {
      label: "Closed",
      value: "CLOSED",
      count: counts.closed,
      href: "/issues?status=CLOSED",
    },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
      {tabs.map((tab) => {
        const isActive =
          (tab.value === "ALL" && !searchParams.get("status")) ||
          currentStatus === tab.value;

        return (
          <Link
            key={tab.value}
            href={tab.href}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                isActive
                  ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
