import Link from "next/link";
import { CheckSquare, LogIn, UserPlus } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-indigo-600 transition">
          <CheckSquare className="h-6 w-6 text-indigo-600" />
          <span>SpecForge</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
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
        </nav>
      </div>
    </header>
  );
}
