# Project Roadmap & Implementation Phases

## Phasing Strategy & Agentic Lifecycle
The development of SpecForge is divided into small, testable, iterative phases. Each phase follows a standardized 4-step agentic execution loop:

```
1. /feature-spec [Phase]  ──>  2. Implementation & Tests  ──>  3. /validate-feature  ──>  4. /maintain-changelog & Merge
```

### The 4-Skill Standardized Workflow:
1. **Spec & Align (`feature-spec`)**: Create feature branch `feature/<feature-name>`, clarify unknowns via interactive questions, and generate synchronized `requirements.md`, `plan.md`, and `validation.md` under `specs/YYYY-MM-DD-<feature-name>/`.
2. **Execute (`implementation`)**: Implement task groups respecting `< 300 lines/file`, adding automated unit/integration tests for each acceptance criterion.
3. **Audit (`validate-feature`)**: Spawn independent auditor subagent to execute quality gates (`pnpm test`, `typecheck`, `lint`, `build`), audit line counts, and verify AC-1..AC-N.
4. **Record & Merge (`maintain-changelog`)**: Update `CHANGELOG.md` with clean separation of spec vs implementation, merge to `main`, and advance roadmap.

---

## Phase Overview

| Phase | Title | Objective | Status |
|---|---|---|---|
| Phase 0 | Foundation & Setup | Tooling, configs, Prisma SQLite, base shell, Vitest setup | Completed |
| Phase 1 | Authentication & Access Control | Registration, login/logout, session management, protected routes | Completed |
| Phase 2 | Issue Management | Issue CRUD (create, view, edit, delete, list), status tracking | Completed |
| Phase 3 | Tagging & Search | Tags association, keyword search, tag-based filtering | Pending |

---

### Phase 0: Foundation & Setup
- [x] Task 0.1: Initialize Next.js project with TypeScript, Tailwind CSS, and pnpm.
- [x] Task 0.2: Configure Prisma with SQLite and initialize database client.
- [x] Task 0.3: Configure Vitest test runner, React Testing Library, and healthcheck test.
- [x] Task 0.4: Build base responsive application layout and navigation shell.
- **Deliverable / Verification**: Running development server, passing `pnpm test`, `pnpm typecheck`, `pnpm lint`.

### Phase 1: Authentication & Access Control
- [x] Task 1.1: User and Session schema, password hashing, and SQLite session utilities.
- [x] Task 1.2: Registration and login server actions with Zod input validation.
- [x] Task 1.3: Auth UI forms (Sign Up, Sign In, Sign Out button) and route middleware.
- **Deliverable / Verification**: Authenticated flows covered with unit tests and route guards.

### Phase 2: Issue Management
- [x] Task 2.1: Issue database model and repository query functions.
- [x] Task 2.2: Issue creation, update, and deletion actions with Zod validation.
- [x] Task 2.3: Issue list view, detail view, and edit forms.
- **Deliverable / Verification**: Full CRUD operations verified with automated unit and integration tests.

### Phase 3: Tagging & Search
- [ ] Task 3.1: Tag model and many-to-many relationship with issues.
- [ ] Task 3.2: Tag assignment and removal during issue creation/editing.
- [ ] Task 3.3: Keyword search (title/description) and tag filtering on issue list.
- **Deliverable / Verification**: Filter and search queries covered by test suites via `/validate-feature`.
