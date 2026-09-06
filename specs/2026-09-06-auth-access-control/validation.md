# Validation & Merge Readiness: Authentication & Access Control

## 1. Acceptance Criteria Verification Matrix

| AC ID | Description | Verification Method | Status |
|---|---|---|---|
| AC-1 | User Registration creates user with hashed password and establishes SQLite session | Unit & schema test + manual registration check | [ ] Pending |
| AC-2 | Duplicate email registration returns error without saving | Validation schema test + manual registration attempt | [ ] Pending |
| AC-3 | Valid login verifies password hash, creates SQLite session, and redirects to `/issues` | Auth session unit test + manual login test | [ ] Pending |
| AC-4 | Invalid login credentials rejected with error message | Unit test & manual form validation | [ ] Pending |
| AC-5 | Logout action revokes SQLite session record and redirects to `/login` | Session test + manual logout click | [ ] Pending |
| AC-6 | Unauthenticated access to `/issues` intercepted and redirected to `/login` | Middleware logic check + manual unauthenticated visit | [ ] Pending |
| AC-7 | Authenticated user visiting `/login` or `/register` redirected to `/issues` | Middleware logic check + manual authenticated visit | [ ] Pending |
| AC-8 | Session persistence across restarts verified via SQLite database | Database session test + server restart check | [ ] Pending |

## 2. Automated Test Suite
- `src/tests/auth/password.test.ts`: Verifies password hashing (`hashPassword`) produces valid salt, and password comparison (`comparePassword`) validates matches and rejects mismatches.
- `src/tests/auth/session.test.ts`: Verifies session token generation, database session creation, session lookup, revocation, and expiration handling.
- `src/tests/auth/validation.test.ts`: Verifies Zod auth schemas enforce email formatting, minimum password length (8 chars), and required names.

## 3. Manual Verification Checklist
1. **Register**: Navigate to `/register`, input name "Alice", email "alice@example.com", password "password123". Submit and confirm session record created in SQLite and redirected to `/issues`.
2. **Duplicate Email**: Navigate to `/register` in an incognito window, attempt to register "alice@example.com". Confirm clear duplicate error message.
3. **Logout**: Click "Sign Out" in Navbar. Confirm session record revoked from SQLite, cookie cleared, and user redirected to `/login`.
4. **Login**: Navigate to `/login`, input valid credentials. Confirm successful login, session established, and redirected to `/issues`.
5. **Route Protection**: Open a new private/incognito window, directly visit `http://localhost:3000/issues`. Confirm automatic redirect to `/login`.
6. **Guest Route Guard**: While logged in, navigate to `http://localhost:3000/login`. Confirm automatic redirect to `/issues`.
7. **Session Persistence**: While logged in, restart the dev server. Refresh `/issues` and confirm you remain logged in.

## 4. Merge Readiness (Definition of Done)
- [ ] All task groups in `plan.md` marked complete.
- [ ] All ACs in `requirements.md` verified in matrix above.
- [ ] Automated unit tests pass without errors (`pnpm test`).
- [ ] TypeScript typecheck passes without errors (`pnpm typecheck`).
- [ ] Linter passes without errors (`pnpm lint`).
- [ ] No file exceeds the 300 lines limit constraint.
- [ ] Git commit messages are clean and descriptive.
