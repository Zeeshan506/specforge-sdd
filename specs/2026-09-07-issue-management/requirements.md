# Feature Requirements: Issue Management

## 1. Context & Business Intent
As outlined in `specs/mission.md` and `specs/roadmap.md` (Phase 2), SpecForge requires an Issue Management subsystem providing full CRUD functionality so that authenticated users can create, browse, inspect, edit, toggle status, and delete issues.

## 2. Scope

### In-Scope
- **Issue Data Model**: `Issue` entity in SQLite storing `id`, `title`, `description`, `status` (`OPEN` | `CLOSED`), `userId` (foreign key to `User`), `createdAt`, and `updatedAt`.
- **Issue Creation**: Dedicated creation page (`/issues/new`) with form validation for title and description, associating new issues with the authenticated author.
- **Issue Listing**: Interactive list view (`/issues`) displaying issue cards/rows with title, author name, status badge, creation date, and status filter tabs (`ALL`, `OPEN`, `CLOSED`).
- **Issue Detail View**: Dedicated detail page (`/issues/[id]`) showing full description, author details, timestamps, and contextual actions.
- **Issue Editing & Status Toggle**: Edit page (`/issues/[id]/edit`) and quick status toggle action (switch between `OPEN` and `CLOSED`).
- **Issue Deletion**: Deletion action removing the issue record with appropriate user authorization checks.
- **Authorization & Ownership**: All issue mutations require active authentication; only the issue author can edit or delete their issue.

### Out-of-Scope (Non-Goals)
- Issue priorities, severity levels, or custom status workflows (kept to binary `OPEN` / `CLOSED` per phase alignment).
- Issue assignees, due dates, or estimation points.
- Tagging and search functionality (deferred to Phase 3).
- Comments, discussions, activity history, and file attachments.

## 3. Constraints & Dependencies
- **Modularity Constraint**: All source, test, and specification files must remain strictly under 300 lines.
- **Data Persistence**: Issue records must be stored in SQLite via Prisma ORM with cascade deletion rules on user removal.
- **Dependencies**: `@prisma/client`, `zod` for payload validation, `lucide-react` for status/action icons.

## 4. Acceptance Criteria
- [ ] **AC-1 (Create Issue)**: Given an authenticated user and valid title and description, when submitted via `/issues/new`, then a new Issue record is created in SQLite with status `OPEN` and the user is redirected to `/issues/[id]`.
- [ ] **AC-2 (Validation on Create/Edit)**: Given invalid inputs (empty title or title > 100 chars), when submitted, then validation errors are displayed and no database record is saved.
- [ ] **AC-3 (List Issues & Filter)**: Given a collection of issues, when navigating to `/issues`, then all issues are displayed with status badges, and filtering by `ALL`, `OPEN`, or `CLOSED` accurately filters the list.
- [ ] **AC-4 (View Issue Detail)**: Given an existing issue ID, when visiting `/issues/[id]`, then the issue title, full description, author name, status, and timestamps are rendered.
- [ ] **AC-5 (Edit Issue)**: Given an authenticated author modifying title, description, or status via `/issues/[id]/edit`, when submitted, then the database record is updated and changes reflect immediately on `/issues/[id]`.
- [ ] **AC-6 (Toggle Status Action)**: Given an authenticated author clicking "Close Issue" or "Reopen Issue", when triggered, then the issue status toggles between `OPEN` and `CLOSED`.
- [ ] **AC-7 (Delete Issue)**: Given an authenticated author triggering deletion on an issue, when confirmed, then the issue record is removed from SQLite and the user is redirected to `/issues`.
- [ ] **AC-8 (Unauthorized Mutation Prevention)**: Given an unauthenticated user or a user who is not the issue author attempting to update or delete an issue, then the request is rejected with an authorization error.

## 5. Edge Cases & Error Handling
- **Non-Existent Issue ID**: Visiting `/issues/[id]` for a non-existent ID renders a clean 404 Not Found state.
- **Empty Issue List State**: When no issues exist (or none match filter), a descriptive empty state with a "Create First Issue" button is displayed.
- **Whitespace Sanitization**: Title and description inputs are trimmed before validation and storage.
