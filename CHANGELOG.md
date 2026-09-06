# Changelog

All notable changes to the SpecForge project across specifications, constitutional design, and code implementations are documented in this file.

The format adheres to Spec-Driven Development principles, strictly separating **Specification & Planning** artifacts from **Feature Implementation & Code** to provide complete traceability for evaluators and developers.

---

## [Phase 1: Authentication & Access Control - Specification] - 2026-09-06

**Commit**: `b1357f8`  
**Milestone**: Establish feature contract and task breakdown for User Authentication & Access Control.

### 📋 Specification & Planning Changes
- **Feature Requirements (`specs/2026-09-06-auth-access-control/requirements.md`)**:
  - Defined scope for user credential model, `bcryptjs` password hashing, and encrypted HTTP-only session cookies via `jose`.
  - Established acceptance criteria `AC-1` through `AC-7` (registration, duplicate email guard, login, invalid credentials, logout, route protection, and guest redirection).
  - Explicitly defined non-goals (OAuth, MFA, email verification) to prevent scope creep.
- **Implementation Plan (`specs/2026-09-06-auth-access-control/plan.md`)**:
  - Outlined 6 modular task groups covering Prisma schema changes, auth security utilities, server actions, UI forms, Next.js middleware, and unit test suites.
- **Validation Matrix (`specs/2026-09-06-auth-access-control/validation.md`)**:
  - Established verification matrix mapping `AC-1`–`AC-7` to test commands and manual verification procedures.

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
