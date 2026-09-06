# Changelog

All notable changes to the SpecForge project across specifications, constitutional design, and code implementations are documented in this file.

The format adheres to Spec-Driven Development principles, strictly separating **Specification & Planning** artifacts from **Feature Implementation & Code** to provide complete traceability for evaluators and developers.

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
