# Implementation Plan: Tagging & Search

## Overview & Architecture Approach
Implement Phase 3 (Tagging & Search) as a modular extension to SpecForge. The implementation adds a relational `Tag` model in SQLite via Prisma, enhances issue query functions to support combined keyword search (title/description) and tag filtering, updates server actions for atomic tag linking/unlinking, and integrates URL-synchronized search and filter UI components. All modules must strictly remain `< 300 lines`.

## Task Groups

### Group 1: Data Model & Tag Query Subsystem
- [x] Task 1.1: Add `Tag` model to `prisma/schema.prisma` with many-to-many relationship to `Issue`, run `prisma db push` / generate client.
- [x] Task 1.2: Create `src/server/queries/tags.ts` for listing all unique tags and tag lookup.
- [x] Task 1.3: Update `src/server/queries/issues.ts` to accept search query (`q`), tag filter (`tag`), and status filter (`status`) with Prisma `contains` and relational `tags.some` queries.

### Group 2: Validation & Server Actions
- [x] Task 2.1: Update `src/lib/validations/issue.ts` with tag schema rules (normalization, trim, max 30 chars per tag, max 10 tags per issue).
- [x] Task 2.2: Update `src/server/actions/issues/create.ts` to connectOrCreate tags on issue creation.
- [x] Task 2.3: Update `src/server/actions/issues/update.ts` to synchronize tag associations (connect new tags, disconnect removed tags).

### Group 3: Search, Filter & Tag UI Components
- [x] Task 3.1: Create `src/components/issues/TagBadge.tsx` for consistent, accessible tag display.
- [x] Task 3.2: Create `src/components/issues/TagInput.tsx` (chip input / tag selector for issue form).
- [x] Task 3.3: Create `src/components/issues/IssueSearchBar.tsx` for keyword search input with URL searchParams synchronization.
- [x] Task 3.4: Create `src/components/issues/TagFilterBar.tsx` for filtering issues by tag.
- [x] Task 3.5: Update `IssueForm.tsx`, `IssueList.tsx`, and `/issues/[id]/page.tsx` to integrate tags and search controls.

### Group 4: Automated Testing & Modularity Audit
- [x] Task 4.1: Write unit and integration tests in `tests/server/queries/search-and-tags.test.ts` verifying AC-1, AC-2, AC-4, AC-5, AC-6, AC-8.
- [x] Task 4.2: Write component tests in `tests/components/issues/IssueSearchBar.test.tsx` and `TagInput.test.tsx` verifying AC-3, AC-7.
- [x] Task 4.3: Execute quality gates (`pnpm test`, `pnpm typecheck`, `pnpm lint`, `pnpm build`) and audit file line counts (< 300 lines limit).
