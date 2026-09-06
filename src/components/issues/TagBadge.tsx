import Link from "next/link";
import { X } from "lucide-react";

interface TagBadgeProps {
  name: string;
  color?: string;
  href?: string;
  active?: boolean;
  onRemove?: () => void;
  size?: "sm" | "md";
}

export function TagBadge({
  name,
  href,
  active = false,
  onRemove,
  size = "sm",
}: TagBadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : "px-2.5 py-1 text-xs font-medium";

  const colorClasses = active
    ? "bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700"
    : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50";

  const badgeContent = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${sizeClasses} ${colorClasses}`}
    >
      <span>#{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove tag ${name}`}
          className="hover:opacity-75 focus:outline-none rounded-full p-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block transition-transform hover:scale-105">
        {badgeContent}
      </Link>
    );
  }

  return badgeContent;
}
