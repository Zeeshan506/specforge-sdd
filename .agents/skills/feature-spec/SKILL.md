---
name: feature-spec
description: >-
  Use this skill at the beginning of each implementation phase in a Spec-Driven Development (SDD) project. It reads the project constitution, determines the next roadmap phase, clarifies feature unknowns via interactive questions, creates a feature branch, and generates synchronized feature specification artifacts (`requirements.md`, `plan.md`, `validation.md`) under `specs/YYYY-MM-DD-<feature-name>/`.
---

# Feature Specification (`feature-spec`)

This skill converts a high-level roadmap phase into a detailed, reviewable contract before implementation begins. It ensures coding agents and developers have explicit, unambiguous alignment on scope, task breakdown, and verification proof.

---

## When to Use

- **Phase Initiation**: When starting any new implementation phase defined in `specs/roadmap.md`.
- **Pre-Implementation Contract**: Before writing application code, schema changes, or UI components for a feature.

---

## Core Workflow

### Phase 1: Context Ingestion & Gap Analysis

1. **Read Constitution**:
   - `specs/roadmap.md`: Identify the next incomplete phase.
   - `specs/mission.md`: Extract stakeholder intent, user personas, and project scope.
   - `specs/tech-stack.md`: Extract architectural rules, stack choices, and constraints (e.g. max 300 lines/file).
2. **Inspect Existing Code**:
   - Examine relevant existing files, models, or endpoints to understand what already exists.
3. **Identify Unknowns**:
   - Do **not** ask about information already present in the repository.
   - Isolate ambiguities in feature scope, edge cases, task ordering, and verification criteria.

---

### Phase 2: User Alignment (`ask_question`)

**Critical Safeguard**: You **must** invoke `ask_question` before writing any specification files to disk.

Group your questions across the three feature documents:
1. **Requirements & Scope**: In-scope behavior, non-goals, acceptance criteria specifics, and edge cases.
2. **Implementation Plan**: Task group breakdown and architectural component boundaries.
3. **Validation Strategy**: Automated test coverage expectations, manual verification steps, and merge criteria.

> Refer to [Questioning & Branching Guide](./references/questioning-and-branching.md) for details.

---

### Phase 3: Branching & Artifact Creation

1. **Create Feature Branch**:
   ```bash
   git checkout -b feature/<feature-name>
   ```
2. **Create Feature Directory**:
   - Target directory: `specs/YYYY-MM-DD-<feature-name>/`
3. **Write Synchronized Artifacts**:
   - [`requirements.md`](./references/feature-templates.md#1-requirementsmd): Scope, acceptance criteria, constraints, edge cases.
   - [`plan.md`](./references/feature-templates.md#2-planmd): Small numbered task groups respecting architecture and file limits.
   - [`validation.md`](./references/feature-templates.md#3-validationmd): Acceptance criteria matrix, test commands, manual checks, definition of done.
4. **Synchronize Artifacts**:
   - Ensure decisions captured in `requirements.md` directly map to task groups in `plan.md` and test verifications in `validation.md`.

---

### Phase 4: Verification & Handoff

1. Verify that all 3 files exist and each file adheres to the `< 300 lines` modularity constraint.
2. Commit the feature specification files to the feature branch.
3. **Stop & Await User Instruction**: The skill concludes with the reviewed specification. **Do not begin implementation code** until the user explicitly directs you to proceed.

---

## Safeguards & Rules

- **No Assumption Drift**: Do not invent feature behaviors; clarify via `ask_question`.
- **Constitutional Alignment**: Do not override global rules from `specs/mission.md` or `specs/tech-stack.md`.
- **Clean Separation of Spec vs Implementation**: Keep implementation tasks out of this skill; focus entirely on the contract.
