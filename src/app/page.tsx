import Link from "next/link";
import { CheckCircle2, ShieldCheck, ListTodo, Tag, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 py-6">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
          <ShieldCheck className="h-4 w-4" />
          <span>Spec-Driven Architecture Active</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Track issues with <span className="text-indigo-600">spec-driven precision</span>
        </h1>
        <p className="text-base text-slate-600 sm:text-lg">
          SpecForge provides clear issue management, categorization, and search, built entirely from rigorous specification contracts.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
            <ListTodo className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Issue Management</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create, view, update, and manage issues with complete lifecycle tracking and validation.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <Tag className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Categorization & Tags</h2>
          <p className="mt-2 text-sm text-slate-600">
            Organize complex bug backlogs and features using flexible, multi-label tagging.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
            <Search className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Instant Search & Filter</h2>
          <p className="mt-2 text-sm text-slate-600">
            Find relevant issues quickly using full-text search across titles and descriptions.
          </p>
        </div>
      </section>

      <section className="rounded-xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
            <CheckCircle2 className="h-4 w-4" />
            <span>Phase 0 Foundation Active</span>
          </div>
          <p className="text-sm text-slate-300">
            Next.js App Router, SQLite, Prisma ORM, and Vitest testing suite configured.
          </p>
        </div>
        <Link
          href="/login"
          className="whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition"
        >
          Access Dashboard
        </Link>
      </section>
    </div>
  );
}
