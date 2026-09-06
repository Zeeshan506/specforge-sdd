# Discovery and Questioning Guidelines

This guide details how to inspect the repository, categorize context, and formulate questions for the user before writing constitution files.

---

## 1. Discovery Checklist

### Greenfield Repositories (Empty or minimal files)
- Check `README.md`, `TODO.md`, user prompt, or initial scaffolding.
- Identify any stated goals or technology preferences given in the initial prompt.

### Brownfield Repositories (Existing codebase)
- **Project Intent & Docs**: Inspect `README.md`, `TODO.md`, `docs/`, `CONTRIBUTING.md`, design notes, or open issues.
- **Dependency & Config Manifests**:
  - Node/JS: `package.json`, `tsconfig.json`, `pnpm-workspace.yaml`
  - Python: `pyproject.toml`, `requirements.txt`, `Pipfile`
  - Rust: `Cargo.toml`
  - Go: `go.mod`
  - Container/Infra: `Dockerfile`, `docker-compose.yml`, Kubernetes manifests, GitHub Actions (`.github/workflows/`)
- **Codebase Structure & Conventions**:
  - Directory hierarchy, naming conventions, architectural patterns (MVC, Clean Architecture, monorepo vs polyrepo).
- **Existing Rules & Decisions**:
  - Inspect any existing `.agents/`, `.gemini/`, or linter rules.

---

## 2. Context Categorization Matrix

Always classify discovered information into one of three buckets:

| Category | Definition | Action Required |
|---|---|---|
| **Fact** | Directly observed in the repository (e.g., `package.json` specifies Next.js 14 and Tailwind). | Record in constitution as existing constraint. |
| **Decision** | Explicitly stated or confirmed by the user in conversation. | Record in constitution as agreed decision. |
| **Assumption** | Inferred, incomplete, or unverified intuition. | **MUST NOT** write as fact. Must be clarified via `ask_question`. |

---

## 3. Mandatory `ask_question` Protocol

Before creating or writing any file in `specs/`, formulate a single `ask_question` call containing questions grouped across the three constitution areas:

### Question 1: Mission, Stakeholders & Audience
- Clarify who the project is for, the core problem being solved, and key boundaries/non-goals.
- *Example format*:
  - Present inferred mission / audience as recommended option.
  - Present common alternatives or allow custom input.

### Question 2: Tech Stack & Architecture Constraints
- Clarify technical preferences, runtime versions, testing tools, and infrastructure targets.
- For brownfield: Confirm if existing tech choices should be preserved or extended.

### Question 3: Scope & Initial Roadmap Phases
- Clarify the immediate priority (e.g., MVP milestone, phase ordering) and breakdown into small, verifiable slices.

### Formatting Rules for Options
- Prefix the best option with `(Recommended)` based on discovered repository facts.
- Formulate options in the first-person voice of the user.
- Set `is_multi_select: true` when multiple choices can coexist (e.g. tech stack components or target audiences).
