# Changelog

All notable changes to the SpecForge project across specifications, constitutional design, and code implementations are documented in this file.

The format adheres to Spec-Driven Development principles, strictly separating **Specification & Planning** artifacts from **Feature Implementation & Code** to provide complete traceability for evaluators and developers.

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
