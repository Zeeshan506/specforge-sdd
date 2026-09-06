---
name: maintain-changelog
description: >-
  Use this skill to update and maintain `CHANGELOG.md` at the repository root. It records changes across commits and phases, cleanly separating specification changes from feature implementation changes under distinct headings for maximum clarity and traceability.
---

# Changelog Maintenance (`maintain-changelog`)

This skill maintains a structured, human-readable, and evaluable record of project evolution in `CHANGELOG.md` at the repository root. It tracks every meaningful change across commits and phases while enforcing a strict separation between **Specification & Planning** changes and **Feature Implementation & Code** changes.

---

## When to Use

- **Post-Commit / Phase Transition**: After committing feature specifications, constitution changes, or code implementations.
- **Milestone Verification**: When auditing the progress and trajectory of the project.
- **SDD Audit**: To provide visible proof to reviewers that specifications preceded implementation.

---

## Core Workflow

### Step 1: Git & State Inspection
1. Inspect git log to identify new commits since the last recorded changelog entry:
   ```bash
   git log --oneline -n 15
   ```
2. Inspect changed files:
   - `specs/`: Changes to constitution or feature specs (`requirements.md`, `plan.md`, `validation.md`).
   - `src/` & configuration: Implementation code, tests, and configuration changes.

### Step 2: Categorization & Formatting
Group changes under the appropriate Phase/Version heading with distinct subheadings:
- **`### 📋 Specification & Planning Changes`**: Constitution updates, new feature specs, acceptance criteria definitions, implementation plan adjustments, and validation matrices.
- **`### 🚀 Feature Implementation & Code Changes`**: Source code changes (`src/`), data models, API endpoints, UI components, and bug fixes.
- **`### 🧪 Testing & Quality Assurance`**: Unit tests, integration tests, test fixtures, and validation runs.
- **`### ⚙️ Tooling & Infrastructure`**: Package configurations, linters, build tooling, and environment setup.

### Step 3: Write / Update `CHANGELOG.md`
1. Maintain reverse chronological order (newest entries at top).
2. Include date, phase/milestone title, commit hashes, concise bullet points, and why the change was made.
3. Keep entries strictly adhering to the `< 300 lines/file` modularity rule (split or summarize if nearing limit).

### Step 4: Verification & Handoff
1. Verify formatting, file links, and line counts (`< 300 lines`).
2. Commit changes to `CHANGELOG.md`.

---

## Safeguards & Principles

- **Separation of Specs vs Implementation**: Never mix specification edits with code modifications in the same bullet list.
- **Traceability**: Link changes back to relevant specification documents and Acceptance Criteria IDs (`AC-X`).
- **Concise & Presentable**: Write in active voice with clear, non-redundant summaries suitable for both human evaluators and automated agents.
