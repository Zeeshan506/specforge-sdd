# Feature Requirements: Tagging & Search

## 1. Context & Business Intent
As defined in `specs/mission.md` and `specs/roadmap.md` (Phase 3), SpecForge requires a tagging and search system to enable users to categorize issues with reusable labels and quickly discover issues through multi-parameter filtering (keyword search across title/description, tag selection, and issue status).

## 2. Scope

### In-Scope
- **Tag Data Model**: `Tag` entity in SQLite storing `id`, `name` (unique, normalized lowercase/trimmed), `color` (optional/default hex code), `createdAt`, and `updatedAt`, with an explicit many-to-many relationship with `Issue`.
- **Tag Management & Association**:
  - Assign existing tags or create new tags on-the-fly during issue creation (`/issues/new`) and editing (`/issues/[id]/edit`).
  - Remove tag associations from issues without deleting the global tag definition.
  - Render tag badges on issue list cards (`/issues`) and issue detail view (`/issues/[id]`).
- **Keyword Search**:
  - Real-time or submit-based search bar on `/issues` querying both `title` and `description` (case-insensitive substring match).
- **Tag & Status Multi-Filtering**:
  - Filter by specific tag(s) via clickable tag badges or dropdown/filter controls.
  - Combine keyword search, tag filter, and status filter (`ALL`, `OPEN`, `CLOSED`) seamlessly via URL `searchParams` (`?q=...&tag=...&status=...`).
- **Persistence & Synchronization**:
  - URL query state persistence for shareable, bookmarkable search and filter views.

### Out-of-Scope (Non-Goals)
- Hierarchical tag categories or tag inheritance.
- Full-text indexing engines (Elasticsearch, Meilisearch) — SQLite `LIKE` / Prisma `contains` queries are sufficient for v1.
- Issue comments, attachments, or assignee search.
- Saved search presets or custom user-defined views.

## 3. Constraints & Dependencies
- **Modularity Constraint**: All source, test, and specification files must remain strictly under 300 lines.
- **Relational Integrity**: Tag associations use relational junction/implicit m:n in Prisma SQLite with cascade cleanup on issue deletion.
- **URL Synchronization**: Search query and active filter state must be reflected in URL search parameters for navigation consistency.
- **Dependencies**: `@prisma/client`, `zod` for payload validation, `lucide-react` for tag/search icons.

## 4. Acceptance Criteria
- [ ] **AC-1 (Tag Creation & Linking)**: Given an authenticated user creating or editing an issue, when tag names are provided (e.g., "bug", "frontend"), then the tags are created if not existing, associated with the issue, and stored in SQLite.
- [ ] **AC-2 (Tag Detachment)**: Given an existing issue with associated tags, when edited to remove a tag, then the tag association is removed from the issue while preserving the tag entity in the database.
- [ ] **AC-3 (Tag Display on List & Detail)**: Given issues with associated tags, when navigating to `/issues` or `/issues/[id]`, then the corresponding tag badges are rendered with distinct styling.
- [ ] **AC-4 (Keyword Search by Title & Description)**: Given a search query `q` entered in the search bar, when submitted or updated, then the issue list filters to only issues whose `title` or `description` contains the query string (case-insensitive).
- [ ] **AC-5 (Filter Issues by Tag)**: Given a selected tag filter (e.g., `?tag=bug`), when applied, then only issues associated with that tag are displayed in the list.
- [ ] **AC-6 (Combined Multi-Criteria Filtering)**: Given a search query, a tag filter, and a status filter (e.g., `?q=auth&tag=security&status=OPEN`), when applied simultaneously, then the results satisfy all active criteria.
- [ ] **AC-7 (Empty Search/Filter State)**: Given search or filter criteria that match zero issues, when viewed, then a clear empty state message is shown with an option to reset filters.
- [ ] **AC-8 (Tag Validation & Normalization)**: Given tag inputs with leading/trailing whitespace or mixed casing, when submitted, then tag names are trimmed and normalized to prevent duplicate near-identical tags.

## 5. Edge Cases & Error Handling
- **Special Characters in Search**: Handling regex/query characters in search strings safely without SQL injection or crashes.
- **Non-Existent Tag Filter**: Navigating to `?tag=nonexistent` gracefully returns an empty results list rather than an error.
- **Long Tag Names**: Enforce maximum tag length (e.g., 30 characters) in Zod schema with user feedback.
- **Duplicate Tags on Same Issue**: Submitting duplicate tags for a single issue deduplicates silently before persisting.
