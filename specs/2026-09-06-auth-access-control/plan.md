# Implementation Plan: Authentication & Access Control

## Overview & Architecture Approach
This plan implements email/password authentication and access control for SpecForge using database-backed sessions in SQLite via Prisma. Sessions are persisted in SQLite, ensuring active logins survive server restarts. Session tokens are transmitted via secure HTTP-only cookies, and Next.js middleware / server utilities guard protected routes. All source and specification files adhere strictly to the `< 300 lines/file` modularity constraint.

## Task Groups

### Group 1: Database Models & Validation Schemas
- [ ] Task 1.1: Define `User` and `Session` models in `prisma/schema.prisma` with foreign key relations and indexes.
- [ ] Task 1.2: Define Zod validation schemas for registration and login payloads in `src/lib/validations/auth.ts`.
- [ ] Task 1.3: Run Prisma migration / generate client.

### Group 2: Security Utilities & Session Management
- [ ] Task 2.1: Implement password hashing and comparison utilities (`src/lib/auth/password.ts`) using `bcryptjs`.
- [ ] Task 2.2: Implement database session creation, lookup, validation, and deletion (`src/lib/auth/session.ts`).
- [ ] Task 2.3: Implement authenticated user retrieval helpers (`src/lib/auth/user.ts`) for server components and actions.

### Group 3: Server Actions & Authentication Handlers
- [ ] Task 3.1: Create registration server action (`src/server/actions/auth/register.ts`) validating input, creating user & session.
- [ ] Task 3.2: Create login server action (`src/server/actions/auth/login.ts`) validating credentials and issuing session.
- [ ] Task 3.3: Create logout server action (`src/server/actions/auth/logout.ts`) destroying session in SQLite and clearing cookies.

### Group 4: Frontend UI Components & Pages
- [ ] Task 4.1: Build `LoginForm` component (`src/components/auth/LoginForm.tsx`) with client validation and error displays.
- [ ] Task 4.2: Build `RegisterForm` component (`src/components/auth/RegisterForm.tsx`) with client validation and error displays.
- [ ] Task 4.3: Create login page (`src/app/login/page.tsx`) and registration page (`src/app/register/page.tsx`).
- [ ] Task 4.4: Update `Navbar` component (`src/components/layout/Navbar.tsx`) to render auth state (user greeting and Sign Out vs Sign In).

### Group 5: Middleware & Access Control Routing
- [ ] Task 5.1: Implement Next.js Edge middleware (`src/middleware.ts`) to guard `/issues/*` and redirect guest/auth users.
- [ ] Task 5.2: Create a placeholder protected issues dashboard view (`src/app/issues/page.tsx`) to verify route access.

### Group 6: Automated Testing & Verification
- [ ] Task 6.1: Write unit tests for password hashing utilities (`src/tests/auth/password.test.ts`).
- [ ] Task 6.2: Write unit tests for database session management (`src/tests/auth/session.test.ts`).
- [ ] Task 6.3: Write unit tests for auth validation schemas (`src/tests/auth/validation.test.ts`).
- [ ] Task 6.4: Verify file modularity constraints (< 300 lines/file) and run `pnpm typecheck`, `pnpm lint`, and `pnpm test`.
