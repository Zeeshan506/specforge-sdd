---
name: init-sdd
description: >-
  Use this skill when starting a new greenfield project or introducing Spec-Driven Development (SDD) into an existing brownfield codebase. It inspects existing repository context, clarifies mission, tech stack, and roadmap through interactive questions, and establishes the project constitution in the `specs/` directory (`mission.md`, `tech-stack.md`, `roadmap.md`).
---

# Spec-Driven Development Initialization (`init-sdd`)

This skill establishes persistent project context and architectural boundaries at repository initialization, ensuring future coding agents can work directly from the repository rather than guessing from transient conversation history.

---

## When to Use

- **Greenfield Projects**: Initializing a brand-new repository with no or minimal code.
- **Brownfield Projects**: Introducing Spec-Driven Development into an existing repository with established architecture, dependencies, or code.

---

## Core Workflow

### Phase 1: Repository Discovery & Context Extraction

Inspect the repository for existing sources of intent, constraints, and architecture:
1. **Intent & Documentation**: Check `README.md`, `TODO.md`, `docs/`, `CONTRIBUTING.md`, architecture notes.
2. **Technical Constraints & Dependencies**: Inspect manifests (`package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`), runtime configs (`tsconfig.json`, `Dockerfile`, CI workflows).
3. **Classify Findings**:
   - **Facts**: Verified repository attributes and established patterns.
   - **Decisions**: Explicit user instructions.
   - **Assumptions**: Inferred ideas or gaps requiring confirmation.

> Refer to [Discovery & Questioning Guide](./references/discovery-and-questioning.md) for detailed inspection steps.

---

### Phase 2: Clarification & Alignment (`ask_question`)

**Critical Safeguard**: You **must not** invent answers or write constitution files based on unverified assumptions.

Execute the `ask_question` tool with questions grouped across the three constitution areas before writing to disk:
1. **Mission & Alignment**: Stakeholders, target audience, core philosophy, goals, and non-goals.
2. **Tech Stack & Constraints**: Core technologies, architectural rules, deployment targets, and hard constraints (e.g. modularity/file length limits).
3. **Roadmap & Phasing**: Immediate milestones, MVP scope, and initial sequence of very small implementation phases.

Format options with `(Recommended)` for choices informed by discovered repository facts.

---

### Phase 3: Writing the Constitution Artifacts

Once the user confirms the details, create the `specs/` directory and write the three constitution files using the standard templates:

1. [`specs/mission.md`](./references/constitution-templates.md#1-specsmissionmd)
   - Why the project exists, stakeholder needs, target audience, goals, scope boundaries, and guiding principles.
2. [`specs/tech-stack.md`](./references/constitution-templates.md#2-specstech-stackmd)
   - Agreed development/deployment technologies, architectural constraints, conventions, and project-wide technical decisions.
3. [`specs/roadmap.md`](./references/constitution-templates.md#3-specsroadmapmd)
   - A living high-level sequence of very small, testable implementation phases.

---

### Phase 4: Verification & Handoff

1. Verify that `specs/mission.md`, `specs/tech-stack.md`, and `specs/roadmap.md` exist and conform to the agreed decisions.
2. Ensure no individual file exceeds 300 lines (adhering to project modularity rules).
3. Inform the user that the project constitution is active, and the repository is ready for Phase 0 / Phase 1 feature specifications.

---

## Safeguards and Anti-Guessing Rules

- **No Premature Feature Design**: Do not design low-level feature specifications or implementation code during initialization. Keep the roadmap at small, incremental phase milestones.
- **Respect Brownfield Context**: In existing codebases, preserve established conventions and dependencies unless explicitly requested to refactor.
- **Separation of Facts vs Assumptions**: Never present an assumption as an established fact in constitution files.
