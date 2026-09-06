# Changelog

All notable changes to the SpecForge project across specifications, constitutional design, and code implementations are documented in this file.

The format adheres to Spec-Driven Development principles, strictly separating **Specification & Planning** artifacts from **Feature Implementation & Code** to provide complete traceability for evaluators and developers.

---

## [Phase 3: Tagging & Search - Implementation] - 2026-09-07

**Milestone**: Deliver full Tagging and Search system (tag creation/linking, tag detachment, multi-parameter keyword search across title/description, tag filtering, status combination, and URL synchronization).

### 🚀 Feature Implementation & Code Changes
- **Database Layer (`prisma/schema.prisma`)**:
  - Added `Tag` model with unique normalized name, color, timestamps, and many-to-many relationship with `Issue` (**AC-1**, **AC-2**).
- **Data Access & Queries (`src/server/queries/`)**:
  - Created `tags.ts`: Implemented `getAllTags` and `getTagByName` queries for listing and retrieving tags (**AC-1**).
  - Updated `issues.ts`: Added support for keyword query `q` (matching title and description), tag filtering (`tag`), and status filtering (`status`) with relations to `tags` (**AC-4**, **AC-5**, **AC-6**).
- **Validation & Server Actions**:
  - Updated `src/lib/validations/issue.ts`: Added `tagSchema` and `tagListSchema` with trimming, lowercase normalization, deduplication, length caps (<= 30 chars), and count limits (<= 10 tags) (**AC-8**).
  - Updated `src/server/actions/issues/create.ts`: Added `connectOrCreate` support for attaching tags during issue creation (**AC-1**).
  - Updated `src/server/actions/issues/update.ts`: Implemented atomic tag synchronization on issue edits (**AC-1**, **AC-2**).
- **Frontend UI & Components**:
  - Created `TagBadge` (`src/components/issues/TagBadge.tsx`): Reusable tag badges with support for links, remove buttons, and active states (**AC-3**).
  - Created `TagInput` (`src/components/issues/TagInput.tsx`): Interactive chip input for adding and removing tags with live validation (**AC-1**, **AC-2**).
  - Created `IssueSearchBar` (`src/components/issues/IssueSearchBar.tsx`): URL-synchronized keyword search input with clear trigger (**AC-4**, **AC-7**).
  - Created `TagFilterBar` (`src/components/issues/TagFilterBar.tsx`): Filter bar with tag count badges and active tag toggles (**AC-5**).
  - Updated `IssueList` (`src/components/issues/IssueList.tsx`): Displayed tag badges on issue cards and added an empty filter state with reset CTA (**AC-3**, **AC-7**).
  - Updated `IssueForm` (`src/components/issues/IssueForm.tsx`): Integrated `TagInput` for tag selection during creation and editing.
  - Updated `IssueFilterTabs` (`src/components/issues/IssueFilterTabs.tsx`): Preserved active search query and tag parameters across status tab switches.
  - Updated routes: `/issues` (`page.tsx`), `/issues/[id]` (`page.tsx`), `/issues/[id]/edit` (`page.tsx`).

### 🧪 Testing & Quality Assurance
- Created test suites:
  - `src/tests/server/queries/search-and-tags.test.ts`: Integration tests for tag creation, tag detachment, substring keyword search, tag filtering, and combined multi-filter queries (**AC-1**, **AC-2**, **AC-4**, **AC-5**, **AC-6**).
  - `src/tests/components/issues/TagBadge.test.tsx`: Component tests for tag badge rendering and removal callbacks (**AC-3**).
  - `src/tests/components/issues/TagInput.test.tsx`: Component tests for chip addition, Enter key support, duplicate prevention, character limits, and tag removal (**AC-1**, **AC-2**, **AC-8**).
  - `src/tests/components/issues/IssueSearchBar.test.tsx`: Component tests for search query synchronization and clear actions (**AC-4**, **AC-7**).
  - `src/tests/components/issues/IssueList.test.tsx`: Component tests for tag display on issue cards and empty filter states (**AC-3**, **AC-7**).
  - Updated `src/tests/issues/validation.test.ts`: Added unit tests for tag schema normalization, trimming, character limits, and deduplication (**AC-8**).
- Verified 100% test pass rate (62/62 tests across 13 test suites), clean typecheck (`pnpm typecheck`), clean linter (`pnpm lint`), and successful production build (`pnpm build`).
- Confirmed all source, test, and specification files strictly satisfy `< 300 lines/file` constraint.

---

## [Phase 3: Tagging & Search - Specification] - 2026-09-07

**Milestone**: Establish feature specification, acceptance criteria, and task breakdown for Tagging & Multi-Parameter Search.

### 📋 Specification & Planning Changes
- **Feature Requirements (`specs/2026-09-07-tagging-search/requirements.md`)**:
  - Defined scope for `Tag` model, tag assignment/detachment, title & description substring search, and URL query persistence.
  - Established acceptance criteria `AC-1` through `AC-8`.
- **Implementation Plan (`specs/2026-09-07-tagging-search/plan.md`)**:
  - Structured 4 modular task groups covering Prisma schema changes, query subsystem, validation & server actions, UI components, and test suites.
- **Validation Matrix (`specs/2026-09-07-tagging-search/validation.md`)**:
  - Defined acceptance criteria verification matrix, automated test mapping, manual checklist, and Definition of Done.

---

## [Constitutional Replanning & Skill Integration] - 2026-09-07

**Milestone**: Formalize 4-skill agentic loop (`init-sdd`, `feature-spec`, `validate-feature`, `maintain-changelog`) across project constitution and roadmap.

### 📋 Specification & Planning Changes
- **Project Mission (`specs/mission.md`)**:
  - Added Section 7 detailing the Agentic SDD Workflow and 4-skill suite.
- **Technology Stack (`specs/tech-stack.md`)**:
  - Added Section 4 documenting Agentic Architecture, skill directory layouts in `.agents/skills/`, and auditor subagent delegation protocols.
- **Roadmap (`specs/roadmap.md`)**:
  - Added the standardized 4-step Phasing Strategy & Agentic Lifecycle loop (`/feature-spec` -> Implementation -> `/validate-feature` -> `/maintain-changelog`).
- **Skill Suite (`.agents/skills/`)**:
  - Added `validate-feature` skill with independent `feature-spec-validator` subagent and structured audit report template.

---

## [Phase 2: Issue Management - Implementation] - 2026-09-07

**Milestone**: Deliver full Issue CRUD operations (create, view details, edit, delete, list with status filtering), database models, repository queries, server actions, and automated test suites.

### 🚀 Feature Implementation & Code Changes
- **Database Layer (`prisma/schema.prisma`)**:
  - Added `Issue` model with `title`, `description`, `status` (`OPEN` | `CLOSED`), and relation to `User` with cascade delete (**AC-1**).
- **Data Access & Queries (`src/server/queries/issues.ts`)**:
  - Implemented `getIssues`: Fetches issues with status filtering (`ALL`, `OPEN`, `CLOSED`) including author metadata (**AC-3**).
  - Implemented `getIssueById`: Fetches single issue with author metadata and 404 safety (**AC-4**).
  - Implemented `getIssueCounts`: Computes status breakdown counts for tabs.
- **Server Actions (`src/server/actions/issues/`)**:
  - Implemented `createIssue` (`create.ts`): Validates title/description via Zod, associates authenticated author, and defaults status to `OPEN` (**AC-1**, **AC-2**).
  - Implemented `updateIssue` and `toggleIssueStatus` (`update.ts`): Updates issue attributes and toggles status between `OPEN` and `CLOSED` with strict author ownership checks (**AC-5**, **AC-6**, **AC-8**).
  - Implemented `deleteIssue` (`delete.ts`): Removes issue record from database with author authorization check (**AC-7**, **AC-8**).
- **Frontend UI & Pages**:
  - Created `IssueFilterTabs` (`src/components/issues/IssueFilterTabs.tsx`): Interactive status filter tabs with count badges.
  - Created `IssueList` (`src/components/issues/IssueList.tsx`): Issue items, status icons, timestamps, and empty state CTA.
  - Created `IssueForm` (`src/components/issues/IssueForm.tsx`): Reusable form for create/edit modes with field validation.
  - Created `IssueActions` (`src/components/issues/IssueActions.tsx`): Quick status toggle, edit link, and delete confirmation dialog.
  - Built routes: `/issues` (`page.tsx`), `/issues/new` (`page.tsx`), `/issues/[id]` (`page.tsx`), and `/issues/[id]/edit` (`page.tsx`).

### 🧪 Testing & Quality Assurance
- Created test suites:
  - `src/tests/issues/validation.test.ts`: Zod schema validation rules, title trimming, length checks, and status validation.
  - `src/tests/issues/crud.test.ts`: Database integration tests for full CRUD lifecycle, status filtering, and count calculations.
- Verified 100% test pass rate (37/37 tests across 8 test suites), clean typecheck (`pnpm typecheck`), and zero linter warnings (`pnpm lint`).
- Verified all files strictly satisfy `< 300 lines/file` constraint.

---

## [Phase 2: Issue Management - Specification] - 2026-09-07

**Commit**: `12b370c`  
**Milestone**: Establish feature contract and task breakdown for Issue Management with binary status lifecycle.

### 📋 Specification & Planning Changes
- **Feature Requirements (`specs/2026-09-07-issue-management/requirements.md`)**:
  - Defined scope for issue CRUD, binary status (`OPEN`, `CLOSED`), author association, and ownership authorization.
  - Established acceptance criteria `AC-1` through `AC-8` (create, validation, list & filter, view details, edit, status toggle, delete, and unauthorized mutation guard).
- **Implementation Plan (`specs/2026-09-07-issue-management/plan.md`)**:
  - Structured 6 task groups for database model, repository queries, server actions, UI components, App Router pages, and test suites.
- **Validation Matrix (`specs/2026-09-07-issue-management/validation.md`)**:
  - Defined acceptance criteria verification matrix, automated test mapping, manual checklist, and Definition of Done.

---

## [Phase 1: Authentication & Access Control - Implementation] - 2026-09-06

**Milestone**: Implement user registration, credential authentication, SQLite-backed session persistence, route protection middleware, and automated auth test suites.

### 🚀 Feature Implementation & Code Changes
- **Database Layer (`prisma/schema.prisma`)**:
  - Added `User` model with unique email and bcrypt password hash (**AC-1**, **AC-2**).
  - Added `Session` model with foreign key relation to `User` and expiry timestamp for database persistence across server restarts (**AC-8**).
- **Security Utilities & Session Management**:
  - Created `src/lib/auth/password.ts`: Implemented `hashPassword` and `comparePassword` using `bcryptjs` (salt rounds = 10).
  - Created `src/lib/auth/session.ts`: Implemented database session lifecycle (creation, lookup, automatic cleanup of expired sessions, revocation) and secure HTTP-only cookie handlers (**AC-3**, **AC-5**, **AC-8**).
  - Created `src/lib/auth/user.ts`: Implemented `getCurrentUser` helper for server components and actions.
  - Created `src/lib/validations/auth.ts`: Defined Zod schemas with sanitization (trim, lowercase) and password length rules.
- **Server Actions (`src/server/actions/auth/`)**:
  - Implemented `registerUser` (`register.ts`): Validates payloads, guards against duplicate emails, hashes password, and creates session (**AC-1**, **AC-2**).
  - Implemented `loginUser` (`login.ts`): Verifies password hashes, creates SQLite session, and sets cookie (**AC-3**, **AC-4**).
  - Implemented `logoutUser` (`logout.ts`): Revokes SQLite session record and clears cookie (**AC-5**).
- **Frontend UI & Route Protection**:
  - Created `LoginForm` (`src/components/auth/LoginForm.tsx`) and `RegisterForm` (`src/components/auth/RegisterForm.tsx`) with client validation and error displays.
  - Created auth routes `/login` (`src/app/login/page.tsx`) and `/register` (`src/app/register/page.tsx`).
  - Created `SignOutButton` (`src/components/auth/SignOutButton.tsx`) and updated `Navbar` (`src/components/layout/Navbar.tsx`) and `RootLayout` (`src/app/layout.tsx`) for dynamic authentication state display.
  - Created protected Issues placeholder view (`src/app/issues/page.tsx`).
  - Implemented Next.js Edge middleware (`src/middleware.ts`) guarding `/issues/*` and redirecting unauthenticated users to `/login` and authenticated users away from auth pages (**AC-6**, **AC-7**).

### 🧪 Testing & Quality Assurance
- Created test suites:
  - `src/tests/auth/password.test.ts`: Password hashing, comparison, and unique salting.
  - `src/tests/auth/session.test.ts`: Session token generation, database session lifecycle, lookup, revocation, and expiration cleanup.
  - `src/tests/auth/validation.test.ts`: Zod schema validation rules and string normalization.
- Verified 100% test pass rate (23/23 tests across 6 test suites), clean typecheck (`pnpm typecheck`), and zero linter warnings (`pnpm lint`).
- Verified all source and markdown files strictly satisfy `< 300 lines/file` constraint.

---

## [Phase 1: Authentication & Access Control - Specification] - 2026-09-06

**Commit**: `b1357f8`  
**Milestone**: Establish feature contract and task breakdown for User Authentication & Access Control.

### 📋 Specification & Planning Changes
- **Feature Requirements (`specs/2026-09-06-auth-access-control/requirements.md`)**:
  - Defined scope for user credential model, `bcryptjs` password hashing, SQLite session persistence across restarts, and encrypted HTTP-only session cookies.
  - Established acceptance criteria `AC-1` through `AC-8` (registration, duplicate email guard, login, invalid credentials, logout, route protection, guest redirection, and restart persistence).
  - Explicitly defined non-goals (OAuth, MFA, email verification) to prevent scope creep.
- **Implementation Plan (`specs/2026-09-06-auth-access-control/plan.md`)**:
  - Outlined 6 modular task groups covering Prisma schema changes, auth security utilities, server actions, UI forms, Next.js middleware, and unit test suites.
- **Validation Matrix (`specs/2026-09-06-auth-access-control/validation.md`)**:
  - Established verification matrix mapping `AC-1`–`AC-8` to test commands and manual verification procedures.

---

## [Phase 0: Foundation & Setup - Implementation] - 2026-09-06

**Commit**: `b4e56de`  
**Milestone**: Scaffold Next.js 14 application, Prisma SQLite database, responsive UI shell, and Vitest test runner.

### 🚀 Feature Implementation & Code Changes
- **Database Layer**:
  - Initialized Prisma ORM with SQLite datasource (`prisma/schema.prisma`) and `SystemHealth` model.
  - Implemented singleton Prisma database client (`src/lib/db.ts`) with hot-reload protection.
- **Application Shell & UI**:
  - Created global styles with Tailwind CSS directives (`src/app/globals.css`).
  - Built responsive top navigation bar (`src/components/layout/Navbar.tsx`) with branding and auth navigation links.
  - Implemented root layout shell (`src/app/layout.tsx`) and landing page (`src/app/page.tsx`) with feature overview cards.

### 🧪 Testing & Quality Assurance
- Configured Vitest test runner and setup file (`vitest.config.ts`, `vitest.setup.ts`) with JSDOM environment.
- Created test suites:
  - `src/tests/healthcheck.test.ts`: Environment & runner validation.
  - `src/tests/db.test.ts`: Database connection and CRUD operations (**AC-2**).
  - `src/tests/app-shell.test.tsx`: Component smoke tests for Navbar and Landing Page (**AC-4**).
- Verified 100% test pass rate (6/6 tests), clean typecheck (`pnpm typecheck`), and zero linter warnings (`pnpm lint`).
- Executed Next.js production build (`pnpm build`) verifying production readiness (**AC-1**).

### ⚙️ Tooling & Infrastructure
- Initialized `package.json` with scripts (`dev`, `build`, `test`, `lint`, `typecheck`, `db:push`).
- Configured TypeScript (`tsconfig.json`), ESLint (`.eslintrc.json`), PostCSS/Tailwind (`tailwind.config.ts`, `postcss.config.js`), and `.gitignore`.

---

## [Phase 0: Foundation & Setup - Specification] - 2026-09-06

**Commit**: `e3040e7`  
**Milestone**: Establish project constitution and Phase 0 specification contracts.

### 📋 Specification & Planning Changes
- **Project Constitution**:
  - Created `specs/mission.md`: Defined core purpose, stakeholder interests, personas, scope boundaries, and guiding principles.
  - Created `specs/tech-stack.md`: Established technology choices (Next.js, TypeScript, Prisma, SQLite, Tailwind, Vitest) and strict modularity rule (< 300 lines/file).
  - Created `specs/roadmap.md`: Defined 4 phased milestones (Phase 0 Foundation, Phase 1 Auth, Phase 2 Issues, Phase 3 Tagging & Search).
- **Phase 0 Feature Spec (`specs/2026-09-06-foundation-setup/`)**:
  - Created `requirements.md`: Outlined `AC-1` through `AC-5` for repository scaffolding, database connectivity, UI shell, and test runner.
  - Created `plan.md`: Structured 4 task groups for scaffolding, database, UI shell, and validation.
  - Created `validation.md`: Defined verification methods and Definition of Done.

---

## [Project Initialization] - 2026-09-06

**Commit Range**: `3fba17c` -> `3f1b2e2`  
**Milestone**: Repository inception, SDD guidelines, and skill integrations.

### 📋 Specification & Planning Changes
- Established repository README (`README.md`) outlining project goals, stakeholder needs, and feature breakdown.
- Added `init-sdd` skill (`.agents/skills/init-sdd/`) for interactive constitutional initialization.
- Added `feature-spec` skill (`.agents/skills/feature-spec/`) for feature specification workflows.
