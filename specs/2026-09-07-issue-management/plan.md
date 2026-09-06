# Implementation Plan: Issue Management

## Overview & Architecture Approach
This plan implements full CRUD issue tracking for SpecForge. It utilizes Prisma ORM with SQLite for persistence, Zod for schema validation, modular server actions for data mutations, and Next.js App Router for dynamic list, detail, create, and edit pages. All source and specification files adhere strictly to the `< 300 lines/file` constraint.

## Task Groups

### Group 1: Database Model & Validation Schemas
- [x] Task 1.1: Add `Issue` model and status enum/representation to `prisma/schema.prisma` linked to `User`.
- [x] Task 1.2: Define Zod validation schemas for issue creation and updating in `src/lib/validations/issue.ts`.
- [x] Task 1.3: Run Prisma migration / update database schema and regenerate client.

### Group 2: Data Access & Repository Queries
- [x] Task 2.1: Implement issue retrieval queries (`src/server/queries/issues.ts`) supporting status filtering (`ALL`, `OPEN`, `CLOSED`) and single-issue fetching with author info.

### Group 3: Server Actions & Mutation Handlers
- [x] Task 3.1: Create issue creation server action (`src/server/actions/issues/create.ts`) with author association.
- [x] Task 3.2: Create issue update and status toggle server actions (`src/server/actions/issues/update.ts`) with author authorization checks.
- [x] Task 3.3: Create issue deletion server action (`src/server/actions/issues/delete.ts`) with author authorization checks.

### Group 4: Frontend UI Components
- [x] Task 4.1: Build `IssueList` and `IssueFilterTabs` components (`src/components/issues/IssueList.tsx`, `src/components/issues/IssueFilterTabs.tsx`).
- [x] Task 4.2: Build reusable `IssueForm` component (`src/components/issues/IssueForm.tsx`) for create and edit modes.
- [x] Task 4.3: Build `IssueActions` component (`src/components/issues/IssueActions.tsx`) for status toggling and delete dialog.

### Group 5: Pages & Routing
- [x] Task 5.1: Build issues dashboard list page (`src/app/issues/page.tsx`) with filter query param support.
- [x] Task 5.2: Build new issue creation page (`src/app/issues/new/page.tsx`).
- [x] Task 5.3: Build issue detail page (`src/app/issues/[id]/page.tsx`) with 404 handling.
- [x] Task 5.4: Build issue edit page (`src/app/issues/[id]/edit/page.tsx`).

### Group 6: Automated Testing & Verification
- [x] Task 6.1: Write unit tests for issue Zod schemas (`src/tests/issues/validation.test.ts`).
- [x] Task 6.2: Write database CRUD and authorization tests (`src/tests/issues/crud.test.ts`).
- [x] Task 6.3: Verify file modularity constraints (< 300 lines/file) and run `pnpm typecheck`, `pnpm lint`, and `pnpm test`.
