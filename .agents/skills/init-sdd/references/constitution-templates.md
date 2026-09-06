# Constitution Templates

This reference provides the standard templates for the three core constitution artifacts written to the `specs/` directory.

---

## 1. `specs/mission.md`

```markdown
# Project Mission & Guiding Principles

## 1. Core Purpose & Philosophy
<!-- Why does this project exist? What fundamental problem does it solve? -->

## 2. Stakeholder Alignment
<!-- Who are the key stakeholders, decision-makers, and sponsors? What are their core expectations? -->

## 3. Target Audience & User Personas
<!-- Who is this built for? Detail primary and secondary users, their workflow, and pain points. -->

## 4. Current Goals & Objectives
<!-- Concrete, measurable objectives for the immediate and near-term milestones. -->

## 5. Scope Boundaries
### In Scope
<!-- What the project explicitly intends to address. -->

### Out of Scope / Non-Goals
<!-- What will NOT be built or addressed to prevent scope creep. -->

## 6. Guiding Principles
<!-- Key product, architectural, or design values guiding future agent decisions. -->
```

---

## 2. `specs/tech-stack.md`

```markdown
# Technology Stack & Architectural Constraints

## 1. Agreed Technologies & Frameworks
<!-- Languages, runtimes, primary frameworks, databases, and third-party services. -->
- **Language / Runtime**:
- **Frameworks**:
- **Data Stores**:
- **Tooling & Package Manager**:

## 2. Architectural Decisions & Patterns
<!-- Key system design patterns, folder conventions, and structural decisions. -->

## 3. Engineering Constraints & Rules
<!-- Strict project-wide rules (e.g., modularity constraints, maximum file line limits). -->
- **File Modularity**: Favor smaller modules; files must not exceed 300 lines.
- **Error Handling**:
- **Testing Requirements**:

## 4. Deployment & Infrastructure
<!-- Target hosting environment, CI/CD expectations, and runtime considerations. -->

## 5. Decision Log
<!-- Significant technical choices, alternatives considered, and rationales. -->
```

---

## 3. `specs/roadmap.md`

```markdown
# Project Roadmap & Implementation Phases

## Phasing Strategy
<!-- High-level sequence broken into very small, incremental, testable phases of work. -->

## Phase Overview

| Phase | Title | Objective | Status |
|---|---|---|---|
| Phase 0 | Foundation & Setup | Establish tooling, config, and scaffolding | Pending |
| Phase 1 | Core Domain / MVP Feature | First end-to-end slice | Pending |
| Phase 2 | Extended Functionality | Secondary workflows and enhancements | Pending |

---

### Phase 0: Foundation & Setup
- [ ] Task 0.1: ...
- [ ] Task 0.2: ...
- **Deliverable / Verification**: ...

### Phase 1: [Phase Name]
- [ ] Task 1.1: ...
- [ ] Task 1.2: ...
- **Deliverable / Verification**: ...

<!-- Future phases are detailed iteratively through individual feature specs. -->
```
