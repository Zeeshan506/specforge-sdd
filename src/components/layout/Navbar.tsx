import Link from "next/link";
import { CheckSquare, LogIn, UserPlus, ListTodo } from "lucide-react";
import type { SafeUser } from "@/lib/auth/user";
import { SignOutButton } from "@/components/auth/SignOutButton";

interface NavbarProps {
  user?: SafeUser | null;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition"
        >
          <CheckSquare className="h-6 w-6 text-indigo-600" />
          <span>SpecForge</span>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/issues"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              >
                <ListTodo className="h-4 w-4" />
                <span>Issues</span>
              </Link>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-gray-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {user.name}
                </span>
                <SignOutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
