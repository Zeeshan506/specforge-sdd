# Implementation Plan: Foundation & Project Scaffolding

## Overview & Architecture Approach
This plan sets up the complete scaffolding for SpecForge using Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma ORM with SQLite, and Vitest. The design enforces modular organization under `src/` where individual files remain well under the 300-line constraint.

## Task Groups

### Group 1: Repository Scaffolding & Tooling Configuration
- [x] Task 1.1: Create `package.json` with scripts (`dev`, `build`, `start`, `lint`, `typecheck`, `test`) and dependencies.
- [x] Task 1.2: Configure TypeScript (`tsconfig.json`), ESLint (`.eslintrc.json`), and PostCSS/Tailwind (`tailwind.config.ts`, `postcss.config.js`).
- [x] Task 1.3: Configure `.gitignore` for Next.js, SQLite files (`*.db`, `*.db-journal`), node_modules, and build outputs.

### Group 2: Database Layer Setup (Prisma + SQLite)
- [x] Task 2.1: Initialize Prisma configuration (`prisma/schema.prisma`) configured for SQLite datasource (`file:./dev.db`).
- [x] Task 2.2: Implement Prisma singleton client instance (`src/lib/db.ts`) with hot-reload guard.
- [x] Task 2.3: Generate initial Prisma client artifacts and verify database connection.

### Group 3: Base Layout & Application Shell
- [x] Task 3.1: Create global CSS (`src/app/globals.css`) with Tailwind utility layers.
- [x] Task 3.2: Create modular navigation component (`src/components/layout/Navbar.tsx`) with branding and placeholder links.
- [x] Task 3.3: Create root layout (`src/app/layout.tsx`) integrating metadata, Navbar, and container.
- [x] Task 3.4: Create landing page (`src/app/page.tsx`) with introductory welcome hero and status indicators.

### Group 4: Testing Setup & Validation
- [x] Task 4.1: Configure Vitest (`vitest.config.ts`) and test setup file (`vitest.setup.ts`) with JSDOM and `@testing-library/jest-dom`.
- [x] Task 4.2: Write healthcheck unit test (`src/tests/healthcheck.test.ts`) validating test runner environment.
- [x] Task 4.3: Write smoke test for root page and navigation shell (`src/tests/app-shell.test.tsx`).
- [x] Task 4.4: Verify `pnpm lint`, `pnpm typecheck`, `pnpm test`, and modularity (< 300 lines/file).
