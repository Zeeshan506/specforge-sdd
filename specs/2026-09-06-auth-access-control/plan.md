# Implementation Plan: Authentication & Access Control

## Overview & Architecture Approach
This plan implements email/password authentication and access control for SpecForge. It uses Prisma for user data modeling, `bcryptjs` for password hashing, `jose` for signed JWT session tokens stored in HTTP-only cookies, and Next.js middleware for route protection. All files adhere strictly to the `< 300 lines/file` constraint.

## Task Groups

### Group 1: User Data Model & Auth Schemas
- [ ] Task 1.1: Add `User` model to `prisma/schema.prisma` (`id`, `email`, `passwordHash`, `name`, `createdAt`, `updatedAt`).
- [ ] Task 1.2: Define Zod validation schemas for registration and login payloads in `src/lib/validations/auth.ts`.
- [ ] Task 1.3: Run Prisma migration / generate client.

### Group 2: Core Auth Services & Security Utilities
- [ ] Task 2.1: Implement password hashing and comparison utilities (`src/lib/auth/password.ts`) using `bcryptjs`.
- [ ] Task 2.2: Implement JWT session signing, verification, and cookie management (`src/lib/auth/session.ts`) using `jose`.
- [ ] Task 2.3: Implement user authentication helpers (`src/lib/auth/user.ts`) to fetch the current authenticated session user.

### Group 3: Server Actions & Authentication Handlers
- [ ] Task 3.1: Create registration server action (`src/server/actions/auth/register.ts`) validating input and creating user.
- [ ] Task 3.2: Create login server action (`src/server/actions/auth/login.ts`) validating credentials and issuing session.
- [ ] Task 3.3: Create logout server action (`src/server/actions/auth/logout.ts`) destroying session cookie.

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
- [ ] Task 6.2: Write unit tests for session token signing and verification (`src/tests/auth/session.test.ts`).
- [ ] Task 6.3: Write unit tests for auth validation schemas (`src/tests/auth/validation.test.ts`).
- [ ] Task 6.4: Verify file modularity constraints (< 300 lines/file) and run `pnpm typecheck`, `pnpm lint`, and `pnpm test`.
