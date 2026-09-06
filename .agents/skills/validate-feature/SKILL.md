---
name: validate-feature
description: >-
  Use this skill to perform an independent QA and Spec-Driven Development (SDD) compliance audit of a feature's implementation against its specification artifacts (`requirements.md`, `plan.md`, `validation.md`), test suites, and constitutional constraints before merging.
---

# Feature Specification Auditor (`validate-feature`)

This skill performs a rigorous, independent quality assurance and compliance audit of implemented feature code against its specification contract (`specs/YYYY-MM-DD-<feature-name>/`), project constitution (`specs/`), automated test suites, and engineering rules.

---

## When to Use

- **Post-Implementation Quality Gate**: After completing the tasks in `plan.md` for a feature phase.
- **Pre-Merge Validation**: Before merging a `feature/*` branch back into `main`.
- **SDD Compliance Audit**: When verifying that code satisfies all Acceptance Criteria (`AC-X`) with proof.

---

## Core Workflow

### Step 1: Identify Spec & Target Feature

1. Identify the target feature directory under `specs/`:
   - Match the active branch (e.g. `feature/issue-management` -> `specs/2026-09-07-issue-management/`), or
   - Use the explicit phase/feature name provided in the user request.
2. Read and ingest the feature artifacts:
   - `requirements.md`: Extract Acceptance Criteria (`AC-1` through `AC-N`), in-scope behaviors, and non-goals.
   - `plan.md`: Extract Task Groups and task items.
   - `validation.md`: Extract Acceptance Criteria Verification Matrix and Definition of Done.
3. Read constitutional constraints:
   - `specs/mission.md`, `specs/tech-stack.md`, `specs/roadmap.md`.

---

### Step 2: Spawn Independent Auditor Subagent

Define and invoke a dedicated `feature-spec-validator` subagent using `define_subagent` and `invoke_subagent`.

The auditor subagent must be tasked with:
1. **Acceptance Criteria Verification**:
   - Inspect source code in `src/` to verify each acceptance criterion is implemented.
   - Map each `AC-X` to concrete source files, functions, and test cases with file links and line numbers.
2. **Implementation Plan Audit**:
   - Verify that every task across all Task Groups in `plan.md` is complete and accurately reflected in code.
3. **Automated Quality Gates**:
   - Execute the automated test suite: `pnpm test`.
   - Execute TypeScript compiler check: `pnpm typecheck`.
   - Execute linter check: `pnpm lint`.
   - Execute production build: `pnpm build`.
4. **Engineering Constraints & Modularity Audit**:
   - Check line counts of all modified and newly created source, spec, test, and schema files.
   - Enforce the constitutional `< 300 lines/file` modularity limit.
5. **Traceability & Changelog Verification**:
   - Confirm that `CHANGELOG.md` records specification changes and implementation changes under distinct headings.
   - Verify clean git history and commit messages.

---

### Step 3: Compile Structured Audit Report

The subagent must compile and return a structured report containing:
1. **Acceptance Criteria Verification Matrix**: Table mapping AC ID, requirement, code implementation evidence, test reference, and status (Passed / Failed).
2. **Plan Execution Audit**: Breakdown of completed task groups and tasks.
3. **Modularity Audit**: Line counts of key modules and compliance status with `< 300 lines/file`.
4. **Automated Quality Gates Summary**: Results from `pnpm test`, `typecheck`, `lint`, and `build`.
5. **Traceability & Git Status**: Verification of `CHANGELOG.md` and commit log.
6. **Final Verdict**: `APPROVED FOR MERGE` or `CHANGES REQUESTED` (with required fixes).

---

### Step 4: Verification & Handoff

1. If the verdict is **`APPROVED FOR MERGE`**:
   - Confirm all artifacts are in sync.
   - Present the audit report with clickable links to the user.
   - Offer to merge the feature branch into `main`.
2. If issues or test failures are detected:
   - Clearly highlight failed criteria, line references, and provide remediation guidance.

---

## Safeguards & Principles

- **Independent Verification**: Do not rely on previous memory snapshots; execute tests and inspect files afresh.
- **Evidence-Based Reporting**: Every passed AC must cite exact source files, server actions, or test files.
- **Zero Tolerance for Modularity Breaches**: Any file exceeding 300 lines must be flagged for refactoring before approval.
