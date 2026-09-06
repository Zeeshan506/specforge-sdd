"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/server/actions/auth/logout";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(async () => {
        await logoutUser();
      })}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition disabled:opacity-50"
      title="Sign Out"
    >
      <LogOut className="h-4 w-4" />
      <span>{isPending ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
