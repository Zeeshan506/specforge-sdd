# Changelog Format & Guidelines

This reference outlines the standard schema and formatting rules for `CHANGELOG.md`.

---

## Standard Entry Template

```markdown
# Changelog

All notable changes across specification design and code implementation are documented in this file.
Format follows Spec-Driven Development principles with distinct separation between specifications and code.

---

## [Phase Title or Version] - YYYY-MM-DD

**Commit Range / Hashes**: `abcdef1` -> `1234567`  
**Milestone / Goal**: One-sentence summary of the phase objective.

### 📋 Specification & Planning Changes
- **Constitution / Feature**: Description of changes in `specs/`.
- **Acceptance Criteria**: Detail newly defined or updated ACs (`AC-1`, `AC-2`, etc.).
- **Plan Breakdown**: Notes on architectural tasks and task groups.

### 🚀 Feature Implementation & Code Changes
- **Components / Modules**: New components, services, routes, or database entities added under `src/`.
- **Bug Fixes / Refactors**: Any code adjustments made during development.

### 🧪 Testing & Quality Assurance
- **Test Suites**: New unit, integration, or smoke tests added.
- **Verification Matrix**: AC verification results and status summary.

### ⚙️ Tooling & Infrastructure
- **Dependencies & Configs**: Configuration files, build tools, package manager changes.
```

---

## Best Practices
1. **Clear Distinctions**: Always differentiate between the specification work (contracts, ACs, plans) and the code that implements it.
2. **Commit References**: Reference short commit hashes for quick auditability.
3. **Modularity**: Ensure `CHANGELOG.md` stays well under 300 lines by writing concise, high-signal entries.
