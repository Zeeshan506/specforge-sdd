# Questioning and Branching Protocols

This reference outlines rules for branching, analyzing existing context, and formulating questions for the `feature-spec` workflow.

---

## 1. Branching & Directory Naming

1. **Date & Directory Convention**:
   - Determine current date in `YYYY-MM-DD` format.
   - Folder name: `specs/YYYY-MM-DD-<feature-name>/` (e.g. `specs/2026-09-06-auth-access-control/`).
2. **Git Branch Creation**:
   - Create and switch to a dedicated branch before writing the spec files:
     ```bash
     git checkout -b feature/<feature-name>
     ```
   - If the branch already exists, checkout the existing branch.

---

## 2. Context Analysis & Identifying Unknowns

Before asking questions, inspect the repository to avoid asking about already decided items:
1. **Read Constitution**:
   - `specs/mission.md`: Check audience, goals, and out-of-scope items.
   - `specs/tech-stack.md`: Check architectural patterns, framework choices, and constraints.
   - `specs/roadmap.md`: Identify the exact phase milestone and scope statement.
2. **Inspect Existing Code**:
   - Check if foundational data models, routes, or components related to this feature already exist.
3. **Isolate Gaps**:
   - What specific user interactions or API payloads are needed?
   - What are the explicit edge cases or error behaviors?
   - How should success be proven?

---

## 3. Question Grouping (`ask_question`)

Group unknowns into a single `ask_question` tool call with 3 targeted questions:

### Question 1: Feature Scope & Edge Cases (`requirements.md`)
- Clarify specific behavior, error handling, and explicit non-goals for this phase.

### Question 2: Implementation Sequence & Boundaries (`plan.md`)
- Clarify preferred breakdown into task groups and architectural boundaries (e.g. schema changes vs API routes vs UI).

### Question 3: Acceptance & Validation Proof (`validation.md`)
- Clarify test expectations (unit, integration, manual steps) and merge criteria.

### Formatting Options
- Prefix the best option with `(Recommended)` based on existing repo patterns.
- Ensure all options are written in the user's first-person voice.
