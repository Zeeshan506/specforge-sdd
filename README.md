# SpecForge — Spec-Driven Development with Coding Agents

SpecForge is a small full-stack issue tracker created as a practical exercise in **Spec-Driven Development (SDD) with coding agents**.

The issue tracker itself is intentionally modest. The primary purpose of this repository is to demonstrate a development workflow where **intent is captured before code is written**, features are implemented from persistent specifications rather than transient prompts, and completed work is verified against explicit acceptance criteria.

The repository therefore serves as both:

* a working application, and
* a record of the methodology used to build it.

The most important artifacts in this project are not only the files under `src/`, but the project constitution, feature specifications, reusable agent skills, validation records, test mappings, changelog, and Git history that explain **why and how the code came to exist**.

---

## What This Project Demonstrates

The central principle used throughout SpecForge was:

> **Specification first. Implementation second. Verification before acceptance.**

Rather than asking a coding agent to build an entire application from a large prompt, development was divided into small phases.

Each phase established its requirements, implementation plan, acceptance criteria, and validation strategy before application code was written.

The resulting workflow was:

```text
Project Intent
      │
      ▼
Project Constitution
      │
      ▼
Roadmap Phase
      │
      ▼
Feature Specification
      │
      ├── requirements.md
      ├── plan.md
      └── validation.md
      │
      ▼
Implementation + Tests
      │
      ▼
Independent Validation
      │
      ▼
Changelog + Merge
```

This makes the repository itself a persistent source of context for coding agents and future development sessions.

---

# 1. Project Constitution

Before implementing features, project-level intent was moved into a persistent constitution under:

```text
specs/
├── mission.md
├── tech-stack.md
└── roadmap.md
```

These files establish the context that should remain stable across individual agent sessions.

### `mission.md`

Defines:

* why the project exists
* stakeholders
* target audience
* project goals
* scope boundaries
* non-goals
* guiding engineering principles

One of the most important rules established here is:

> **Spec Before Code**

Application code should not be written for a feature until its intended behaviour has first been captured through a feature specification.

### `tech-stack.md`

Records project-wide technical decisions and engineering constraints.

This prevents individual agent sessions from independently choosing technologies or introducing incompatible architectural decisions.

### `roadmap.md`

Breaks the application into small implementation phases rather than treating the entire project as a single request.

The completed roadmap was:

| Phase   | Focus                           | Status    |
| ------- | ------------------------------- | --------- |
| Phase 0 | Foundation & Setup              | Completed |
| Phase 1 | Authentication & Access Control | Completed |
| Phase 2 | Issue Management                | Completed |
| Phase 3 | Tagging & Search                | Completed |

The roadmap remained a **living document** and was updated when the development process itself evolved.

---

# 2. Feature Specifications

Each roadmap phase was converted into its own specification package before implementation.

For example:

```text
specs/
├── 2026-09-06-foundation-setup/
├── 2026-09-06-auth-access-control/
├── 2026-09-07-issue-management/
└── 2026-09-07-tagging-search/
```

Each feature directory follows the same structure:

```text
YYYY-MM-DD-feature-name/
├── requirements.md
├── plan.md
└── validation.md
```

### `requirements.md`

Defines **what the feature must do**.

It captures:

* feature scope
* behaviour
* constraints
* edge cases
* non-goals
* decisions
* acceptance criteria

Acceptance criteria are assigned identifiers such as:

```text
AC-1
AC-2
AC-3
...
```

These identifiers later connect requirements to implementation and tests.

### `plan.md`

Defines the implementation strategy as small numbered task groups.

The plan exists between requirements and implementation:

```text
Requirement
    ↓
Implementation Task
    ↓
Code
```

This allows implementation to be delegated to a coding agent without requiring the developer to repeatedly reconstruct the feature from conversation history.

### `validation.md`

Defines **how we will know that the feature is actually complete**.

Validation documents map acceptance criteria to:

* automated tests
* integration tests
* manual verification where necessary
* quality gates
* Definition of Done

This completes the chain:

```text
Intent → Requirement → Plan → Implementation → Evidence
```

---

# 3. Reusable Agent Skills

A major goal of the project was to move repeated SDD workflows out of one-off prompts and into reusable agent skills.

They live under:

```text
.agents/skills/
├── init-sdd/
├── feature-spec/
├── validate-feature/
└── maintain-changelog/
```

The skills encode the **development process**, not the product itself.

This means the same workflows can later be reused on other projects.

## `init-sdd`

Used when establishing Spec-Driven Development in a greenfield or brownfield repository.

The skill:

1. inspects existing repository context
2. separates known facts from assumptions
3. identifies missing stakeholder and technical information
4. asks the developer for clarification rather than inventing requirements
5. generates the project constitution

Its output is:

```text
specs/mission.md
specs/tech-stack.md
specs/roadmap.md
```

The important purpose of this skill is not merely generating Markdown files.

Its purpose is to create **persistent project context so future agents do not have to depend on conversation memory or guess the developer's intent**.

---

## `feature-spec`

Used whenever a new roadmap phase begins.

The skill reads the existing constitution and current codebase, identifies the next roadmap phase, determines what information is still unknown, and asks targeted questions before creating specifications.

It then produces:

```text
requirements.md
plan.md
validation.md
```

The skill deliberately stops before implementation.

This creates a review point where the human developer can inspect and correct the feature contract before code is generated.

---

## `validate-feature`

Used after implementation and before merging.

Instead of allowing the implementing agent to simply declare its own work complete, validation is treated as a separate quality gate.

The validator checks:

* every acceptance criterion
* implementation tasks
* source-code evidence
* mapped tests
* constitutional constraints
* file modularity
* TypeScript checks
* linting
* production build
* Git and changelog traceability

The automated quality gates used in the project include:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Validation ends with a merge decision such as:

```text
APPROVED FOR MERGE
```

or:

```text
CHANGES REQUESTED
```

This makes completion an **evidence-based decision rather than an agent assertion**.

---

## `maintain-changelog`

The changelog is also treated as part of the SDD workflow rather than ordinary release notes.

`CHANGELOG.md` deliberately separates:

### Specification & Planning Changes

Changes to:

* constitution
* feature requirements
* acceptance criteria
* implementation plans
* validation strategies

from:

### Feature Implementation & Code Changes

Changes to:

* application code
* database models
* server actions
* components
* routes

and:

### Testing & Quality Assurance

Changes to:

* automated tests
* integration tests
* validation runs
* quality-gate results

This distinction is important because it creates visible evidence that the specification evolved separately from its implementation.

---

# 4. The Development Loop

After initialization, each major feature followed approximately the same lifecycle:

```text
1. Select next roadmap phase
        ↓
2. Run feature-spec
        ↓
3. Review requirements / plan / validation
        ↓
4. Implement approved plan
        ↓
5. Add tests mapped to acceptance criteria
        ↓
6. Run validate-feature
        ↓
7. Correct implementation if necessary
        ↓
8. Record changes in CHANGELOG.md
        ↓
9. Merge feature branch
        ↓
10. Continue to next roadmap phase
```

This loop keeps responsibilities separated.

The **human developer** primarily provides:

* intent
* stakeholder knowledge
* decisions
* constraints
* review
* acceptance

The **coding agent** primarily handles:

* repository analysis
* specification drafting
* implementation
* testing
* validation assistance
* repetitive development operations

The goal is not to remove the developer from the process.

It is to move the developer toward **designing, supervising, reviewing, and accepting work**, while giving the agent enough durable context to execute reliably.

---

# 5. Traceability

One of the strongest benefits of the approach is traceability.

A feature can be followed through the repository as:

```text
Project Mission
      ↓
Roadmap Phase
      ↓
Feature Requirement
      ↓
Acceptance Criterion
      ↓
Implementation Task
      ↓
Source Code
      ↓
Automated Test
      ↓
Validation Result
      ↓
Changelog Entry
```

For example, implementation and test entries in the changelog explicitly reference acceptance criteria such as:

```text
AC-1
AC-2
AC-4
```

This provides a direct connection between **what was requested and the evidence that it was delivered**.

---

# 6. Replanning

The constitution was not treated as immutable.

During development, the workflow itself was improved and the repository was replanned to formally introduce the four-skill lifecycle:

```text
feature-spec
    ↓
implementation
    ↓
validate-feature
    ↓
maintain-changelog
```

Those changes were first reflected in the project specifications and roadmap rather than existing only as informal agent instructions.

This demonstrates another important part of SDD:

> When the intended system or development process changes, update the specification first and keep the implementation synchronized with it.

---

# 7. Why the Changelog Matters

`CHANGELOG.md` provides a chronological view of how the project evolved.

It records milestones such as:

* project constitution creation
* feature specification creation
* feature implementation
* testing and validation
* constitutional replanning
* agent skill integration

For an evaluator, this makes it possible to inspect not only the final result but also the **sequence of decisions that produced it**.

The changelog therefore acts as part of the project's SDD evidence.

---

# 8. What Was Built

The application used to exercise the methodology is a small authenticated issue tracker supporting:

* user registration and authentication
* protected application routes
* issue creation
* issue viewing
* issue editing
* issue deletion
* issue status management
* tagging
* keyword search
* tag filtering
* automated unit and integration testing

The implementation uses a modern full-stack TypeScript stack with Next.js, Prisma, SQLite, Tailwind CSS, Vitest, and related tooling.

The application's scope was intentionally limited so that the primary focus could remain on **learning and exercising the development methodology rather than expanding product complexity**.

---

# 9. Repository Structure

```text
specforge-sdd/
│
├── .agents/
│   └── skills/
│       ├── init-sdd/
│       ├── feature-spec/
│       ├── validate-feature/
│       └── maintain-changelog/
│
├── specs/
│   ├── mission.md
│   ├── tech-stack.md
│   ├── roadmap.md
│   │
│   ├── 2026-09-06-foundation-setup/
│   ├── 2026-09-06-auth-access-control/
│   ├── 2026-09-07-issue-management/
│   └── 2026-09-07-tagging-search/
│
├── src/
│   └── application implementation and tests
│
├── prisma/
│   └── database schema
│
├── CHANGELOG.md
└── README.md
```

When reviewing this repository as an SDD project, the recommended order is:

```text
README.md
    ↓
specs/mission.md
    ↓
specs/tech-stack.md
    ↓
specs/roadmap.md
    ↓
individual feature specifications
    ↓
CHANGELOG.md
    ↓
implementation and tests
```

---

# 10. Testing as Specification Evidence

Testing was not treated as a separate activity performed only after implementation.

Acceptance criteria defined during specification were mapped to automated tests during implementation.

By the final Tagging & Search phase, the project validation reported:

```text
62 passing tests
13 test suites
```

alongside successful:

```text
pnpm typecheck
pnpm lint
pnpm build
```

The important metric, however, is not simply the number of tests.

The important part is that tests provide **evidence for specific acceptance criteria established before implementation**.

---

# 11. Backlogs

The SDD material also introduced the idea of maintaining persistent research backlogs.

A backlog can preserve findings such as:

* technical research
* implementation alternatives
* trade-offs
* caveats
* deferred decisions
* recommendations that may become relevant later

This prevents future agent sessions from repeating the same research after context is lost.

A formal backlog workflow was **not introduced into SpecForge**.

The project was intentionally small enough that the additional mechanism would provide limited value. Backlog-driven persistent research will instead be explored in a larger project where architectural research and deferred technical decisions are substantial enough to demonstrate the concept properly.

---

# 12. Main Takeaway

SpecForge was not primarily an exercise in building another issue tracker.

It was an exercise in changing the relationship between a developer and a coding agent.

Instead of:

```text
Prompt → Code → Fix → Prompt Again
```

the project experimented with:

```text
Intent
  ↓
Persistent Specifications
  ↓
Agent Execution
  ↓
Evidence-Based Validation
  ↓
Recorded Evolution
```

The most valuable output of the project is therefore the **development system surrounding the application**:

* the constitution preserves project intent
* the roadmap controls development scope
* feature specifications create implementation contracts
* acceptance criteria define observable success
* tests provide evidence
* validation provides an independent quality gate
* reusable skills encode repeatable workflows
* the changelog preserves project evolution

Together, these artifacts demonstrate how Spec-Driven Development can improve **intent fidelity, continuity between agent sessions, traceability, and control over agent-generated software**.

---

## Status

All planned SpecForge phases are complete:

* [x] Project constitution
* [x] Foundation & Setup
* [x] Authentication & Access Control
* [x] Issue Management
* [x] Tagging & Search
* [x] Acceptance-criteria-based test coverage
* [x] Feature validation workflow
* [x] Reusable local SDD skills
* [x] SDD-oriented changelog
* [x] Completed roadmap

The project now serves as a completed practical implementation of the Spec-Driven Development workflow explored during the course.
