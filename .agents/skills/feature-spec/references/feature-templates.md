# Feature Specification Templates

This reference contains the standard templates for the three feature specification artifacts located in `specs/YYYY-MM-DD-feature-name/`.

---

## 1. `requirements.md`

```markdown
# Feature Requirements: [Feature Name]

## 1. Context & Business Intent
<!-- Connect this feature to specs/mission.md. Why are we building this now? -->

## 2. Scope
### In-Scope
<!-- Concrete capabilities and behaviors to be delivered. -->
- [ ] Requirement 1: ...
- [ ] Requirement 2: ...

### Out-of-Scope (Non-Goals)
<!-- Explicit exclusions to prevent scope creep. -->
- Non-goal 1: ...

## 3. Constraints & Dependencies
<!-- Specific constraints from specs/tech-stack.md, existing code, or external APIs. -->

## 4. Acceptance Criteria
<!-- Explicit, testable criteria required for sign-off. -->
- [ ] **AC-1**: Given [context], when [action], then [expected result].
- [ ] **AC-2**: Given [context], when [action], then [expected result].

## 5. Edge Cases & Error Handling
<!-- Scenarios involving failure states, validation errors, or boundary conditions. -->
```

---

## 2. `plan.md`

```markdown
# Implementation Plan: [Feature Name]

## Overview & Architecture Approach
<!-- High-level strategy respecting specs/tech-stack.md and existing codebase patterns. -->

## Task Groups

### Group 1: Data Model & Schema (or Foundation)
- [ ] Task 1.1: Define schema / types.
- [ ] Task 1.2: Implement database migrations / repository methods.

### Group 2: Business Logic & Core Services
- [ ] Task 2.1: Implement domain services and validation rules.
- [ ] Task 2.2: Add unit tests for business logic.

### Group 3: API & User Interface
- [ ] Task 3.1: Build API endpoints / route handlers.
- [ ] Task 3.2: Implement frontend components / views.

### Group 4: Integration & Automated Testing
- [ ] Task 4.1: Add end-to-end or integration tests mapping to ACs.
- [ ] Task 4.2: Verify modularity constraints (files <= 300 lines).
```

---

## 3. `validation.md`

```markdown
# Validation & Merge Readiness: [Feature Name]

## 1. Acceptance Criteria Verification Matrix

| AC ID | Description | Verification Method | Pass / Fail |
|---|---|---|---|
| AC-1 | ... | Automated Test / Manual Check | [ ] |
| AC-2 | ... | Automated Test / Manual Check | [ ] |

## 2. Automated Test Suite
<!-- Specific test files and test cases to run. -->
- `path/to/test_file`: Tests AC-1 and AC-2.

## 3. Manual Verification Checklist
<!-- Step-by-step reproduction instructions for developer verification. -->
1. Step 1: ...
2. Step 2: ...

## 4. Merge Readiness (Definition of Done)
- [ ] All task groups in `plan.md` marked complete.
- [ ] All ACs in `requirements.md` verified in matrix above.
- [ ] Automated tests pass without errors.
- [ ] No file exceeds 300 lines limit.
- [ ] Git commit messages are clean and descriptive.
```
