# Validation & Merge Readiness: Tagging & Search

## 1. Acceptance Criteria Verification Matrix

| AC ID | Acceptance Criteria Summary | Verification Method | Status |
|---|---|---|---|
| AC-1 | Tag Creation & Linking during create/edit | Automated Test (`src/tests/server/queries/search-and-tags.test.ts`) | [x] Verified |
| AC-2 | Tag Detachment without deleting global tag | Automated Test (`src/tests/server/queries/search-and-tags.test.ts`) | [x] Verified |
| AC-3 | Tag Display on Issue list card and detail view | Component Test (`src/tests/components/issues/TagBadge.test.tsx`, `IssueList.test.tsx`) | [x] Verified |
| AC-4 | Keyword Search matching title and description | Automated Test (`src/tests/server/queries/search-and-tags.test.ts`, `IssueSearchBar.test.tsx`) | [x] Verified |
| AC-5 | Tag Filtering narrowing issue list | Automated Test (`src/tests/server/queries/search-and-tags.test.ts`) | [x] Verified |
| AC-6 | Combined Multi-Criteria Filtering (query + tag + status) | Automated Test (`src/tests/server/queries/search-and-tags.test.ts`) | [x] Verified |
| AC-7 | Empty Search/Filter State with reset action | Component Test (`src/tests/components/issues/IssueList.test.tsx`, `IssueSearchBar.test.tsx`) | [x] Verified |
| AC-8 | Tag Validation, Normalization & Deduplication | Unit Test (`src/tests/issues/validation.test.ts`) | [x] Verified |

## 2. Automated Test Suite
- `src/tests/issues/validation.test.ts`: Validates tag array bounds, normalization, and max character constraints (AC-8).
- `src/tests/server/queries/search-and-tags.test.ts`: Validates database tag association, search substring matching, and multi-filter criteria queries (AC-1, AC-2, AC-4, AC-5, AC-6).
- `src/tests/components/issues/IssueSearchBar.test.tsx`: Validates search bar input behavior and URL parameter updates (AC-4, AC-7).
- `src/tests/components/issues/TagInput.test.tsx`: Validates tag adding/removing interactive chip controls (AC-1, AC-2).
- `src/tests/components/issues/TagBadge.test.tsx`: Validates tag badge rendering and removal callbacks (AC-3).
- `src/tests/components/issues/IssueList.test.tsx`: Validates tag display on issue list items and empty state with filter reset (AC-3, AC-7).

## 3. Manual Verification Checklist
1. **Tag Assignment**: Navigate to `/issues/new`, input title, description, and enter tags `"bug"`, `"security"`. Submit and verify tags render on detail page `/issues/[id]`.
2. **Tag Removal**: Click "Edit", remove the `"security"` tag chip, save, and verify only `"bug"` remains on the issue.
3. **Keyword Search**: Navigate to `/issues`, enter query `"security"` in the search bar, verify list filters down to matching issues.
4. **Tag Filter**: Click on `"bug"` tag filter badge, verify only issues tagged with `"bug"` are listed.
5. **Combined Filter**: Search `"test"` + tag `"bug"` + status `"OPEN"`, verify URL reflects `?q=test&tag=bug&status=OPEN` and results match all three.
6. **Reset Filters**: Clear search input or click "Clear filters", verify full list re-renders.

## 4. Merge Readiness (Definition of Done)
- [x] All 4 task groups in `plan.md` marked complete.
- [x] All 8 ACs verified in Acceptance Criteria Verification Matrix.
- [x] Automated tests pass with zero failures (`pnpm test`).
- [x] TypeScript typechecking passes (`pnpm typecheck`).
- [x] ESLint passes without errors or warnings (`pnpm lint`).
- [x] Production build succeeds (`pnpm build`).
- [x] Modularity constraint confirmed: all spec, source, and test files <= 300 lines.
- [x] Spec artifacts committed to branch `feature/tagging-search`.
