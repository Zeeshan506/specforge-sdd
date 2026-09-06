# Project Mission & Guiding Principles

## 1. Core Purpose & Philosophy
SpecForge is a full-stack issue tracking web application built to demonstrate Spec-Driven Development (SDD) in practice. The repository serves as living evidence that software requirements are defined before implementation, and that features are planned, executed, tested, and validated against explicit acceptance criteria.

## 2. Stakeholder Alignment
| Stakeholder | Core Interest / Expectations |
|---|---|
| Authenticated User | Needs to create, view, update, search, tag, and manage issues easily. |
| Project / Team Member | Needs a simple shared way to track work and identify relevant issues. |
| Repository Maintainer | Needs clear specifications, modular architecture (< 300 lines/file), and automated tests. |
| Reviewer / Evaluator | Needs visible proof of SDD: constitution, specs, plans, acceptance criteria, and clean Git history. |

## 3. Target Audience & User Personas
- **Primary User**: Individual developers and small agile software teams tracking tasks, bugs, and feature requests.
- **Evaluator / Auditor**: Technical reviewers verifying rigorous adherence to Spec-Driven Development workflows.

## 4. Current Goals & Objectives
- Deliver a reliable, responsive, authenticated issue tracking application.
- Maintain full SDD artifacts (`specs/` constitution and per-feature directories with `requirements.md`, `plan.md`, `validation.md`).
- Ensure 100% automated test coverage for core business rules mapped to acceptance criteria.

## 5. Scope Boundaries
### In Scope
- User authentication & access control (Registration, Sign In, Sign Out, SQLite session persistence).
- Issue management CRUD (Create, Read details, Update, Delete, List, binary status toggle).
- Tagging system (Add/remove tags, filter issues by tags).
- Issue search and filtering (Keyword search on title/description, multi-filter).
- Automated test suite (Unit and integration tests).

### Out of Scope / Non-Goals (v1)
- Multi-tenant organizations and workspace management.
- Team collaboration invitations and role hierarchies.
- Issue comments and file/image attachments.
- Webhooks, real-time WebSockets, or notification systems.
- Kanban boards and issue dependency graphs.
- External tool integrations (e.g., GitHub, Jira, AI assistants).

## 6. Guiding Principles
1. **Spec Before Code**: Never write application code without an approved feature specification.
2. **Modularity & File Limits**: Keep modules cohesive and strictly under 300 lines per file.
3. **Traceability**: Every test case and pull request must trace directly to an acceptance criterion ID.
4. **Simple & Robust**: Prioritize simplicity, clear error states, and high reliability over over-engineering.

## 7. Agentic SDD Workflow & Skill Suite
To maintain reproducible, high-quality development, autonomous agents and developers utilize a specialized skill suite located in `.agents/skills/`:
- **`init-sdd`**: Bootstraps the project constitution (`mission.md`, `tech-stack.md`, `roadmap.md`).
- **`feature-spec`**: Establishes pre-implementation feature contracts (`requirements.md`, `plan.md`, `validation.md`) with explicit user alignment questions.
- **`validate-feature`**: Spawns an independent auditor subagent to thoroughly audit implemented code against acceptance criteria, run quality gates, and enforce modularity before merging.
- **`maintain-changelog`**: Updates `CHANGELOG.md` with strict separation between specification and implementation changes.
