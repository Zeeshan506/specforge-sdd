import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "SpecForge — Spec-Driven Issue Tracker",
  description: "A full-stack issue tracking web application demonstrating Spec-Driven Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:px-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4">
            SpecForge — Built with Spec-Driven Development (SDD)
          </div>
        </footer>
      </body>
    </html>
  );
}
