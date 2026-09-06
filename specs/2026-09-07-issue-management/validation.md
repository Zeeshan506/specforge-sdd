# Validation & Merge Readiness: Issue Management

## 1. Acceptance Criteria Verification Matrix

| AC ID | Description | Verification Method | Status |
|---|---|---|---|
| AC-1 | Create Issue with title and description associates authenticated author and creates SQLite record | Integration test + manual creation check | [ ] Pending |
| AC-2 | Validation prevents saving issues with empty title or title exceeding 100 characters | Schema unit test + manual validation check | [ ] Pending |
| AC-3 | Issues list displays all issues with status badges and filters accurately by `ALL`, `OPEN`, `CLOSED` | Repository query test + UI component check | [ ] Pending |
| AC-4 | Issue detail page displays title, description, author info, status badge, and timestamps | Query test + page render test | [ ] Pending |
| AC-5 | Edit issue updates title, description, and status with immediate reflection on detail page | Action unit test + manual edit check | [ ] Pending |
| AC-6 | Status toggle action switches issue between `OPEN` and `CLOSED` | Action unit test + manual toggle check | [ ] Pending |
| AC-7 | Delete issue removes record from SQLite and redirects to `/issues` | Action unit test + manual deletion check | [ ] Pending |
| AC-8 | Unauthorized mutations (unauthenticated or non-author) are rejected | Authorization unit test | [ ] Pending |

## 2. Automated Test Suite
- `src/tests/issues/validation.test.ts`: Verifies issue Zod schemas (title length requirements, trimming, description handling).
- `src/tests/issues/crud.test.ts`: Verifies full issue lifecycle in SQLite via Prisma (creation, query with author, status updates, status toggles, deletion, and non-author authorization guards).

## 3. Manual Verification Checklist
1. **Create Issue**: Navigate to `/issues/new`, submit title "Fix navigation glitch", description "Mobile menu is misaligned". Verify redirect to `/issues/[id]` and `OPEN` status badge.
2. **Validation**: Attempt submitting an issue with an empty title; confirm form displays validation error.
3. **List & Filter**: Navigate to `/issues`. Toggle between "All", "Open", and "Closed" filter tabs to verify filtering.
4. **Detail View**: Click on an issue card; confirm all fields, author name, and timestamps render accurately.
5. **Edit Issue**: Click "Edit", change title to "Fix navigation responsiveness", save and verify detail view updates.
6. **Toggle Status**: Click "Close Issue" on detail page; verify status badge updates to `CLOSED`. Click "Reopen Issue" and verify it switches back to `OPEN`.
7. **Delete Issue**: Click "Delete Issue", confirm in dialog; verify record is removed and browser redirects to `/issues`.

## 4. Merge Readiness (Definition of Done)
- [ ] All task groups in `plan.md` marked complete.
- [ ] All ACs in `requirements.md` verified in matrix above.
- [ ] Automated unit and integration tests pass without errors (`pnpm test`).
- [ ] TypeScript typecheck passes without errors (`pnpm typecheck`).
- [ ] Linter passes without errors (`pnpm lint`).
- [ ] No file exceeds the 300 lines limit constraint.
- [ ] Git commit messages are clean and descriptive.
