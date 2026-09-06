# Feature Requirements: Authentication & Access Control

## 1. Context & Business Intent
As defined in `specs/mission.md` and `specs/roadmap.md` (Phase 1), SpecForge requires an authentication and access control system so that users can securely register, log in, maintain persistent sessions across server restarts via SQLite, and access protected issue tracking functionality.

## 2. Scope

### In-Scope
- **User Credential Model**: `User` entity storing unique `email`, `passwordHash`, `name`, `createdAt`, and `updatedAt`.
- **Database-Backed Sessions**: `Session` entity in SQLite storing `id`, `sessionToken`, `userId` (relation to User), `expiresAt`, and `createdAt` to guarantee persistence across server restarts.
- **Password Security**: Cryptographic password hashing and comparison using `bcryptjs` (salt rounds >= 10).
- **Session Management**: Session tokens stored securely in HTTP-only, SameSite=Lax cookies, with validation against the SQLite database.
- **Registration**: Public registration form (`/register`) accepting email, name, and password with validation.
- **Login & Logout**: Secure login form (`/login`) validating credentials, creating SQLite session record, and setting cookies; logout action revoking session record and clearing cookies.
- **Route Access Protection**: Next.js middleware and server-side session checks guarding `/issues/*` for authenticated users, redirecting guests to `/login`, and redirecting logged-in users away from guest-only pages (`/login`, `/register`).
- **Auth State in UI**: Navigation header dynamically displaying user profile/name and Sign Out button when authenticated, or Login/Register links when unauthenticated.

### Out-of-Scope (Non-Goals)
- OAuth social logins (Google, GitHub).
- Email verification links or password reset emails.
- Multi-factor authentication (MFA / 2FA).
- Multi-tenant organization and RBAC role hierarchies.

## 3. Constraints & Dependencies
- **Modularity Constraint**: All source and specification files must remain strictly under 300 lines.
- **Data Persistence**: SQLite session storage must persist through application/server restarts.
- **Security**: No plaintext passwords in database or logs; session cookies must be `HttpOnly`, `SameSite=Lax`, and `Secure` in production.
- **Dependencies**: `bcryptjs`, `@prisma/client`, `zod` for input validation.

## 4. Acceptance Criteria
- [x] **AC-1 (User Registration)**: Given valid registration data (unique email, password >= 8 chars, name), when submitted via `/register`, then a new User record is created with a hashed password, a database session is created, and an active session cookie is established.
- [x] **AC-2 (Duplicate Email Prevention)**: Given an email that already exists in the database, when a user attempts registration with that email, then the system returns a descriptive 400 error message without creating duplicate records.
- [x] **AC-3 (User Login)**: Given valid user credentials, when submitted via `/login`, then the system verifies the password against `passwordHash`, creates a database session in SQLite, sets an HTTP-only session cookie, and redirects the user to `/issues`.
- [x] **AC-4 (Invalid Credentials Handling)**: Given incorrect email or password, when submitted to `/login`, then the system rejects the request with an invalid credentials error and sets no session cookie.
- [x] **AC-5 (User Logout & Session Revocation)**: Given an authenticated user, when invoking the logout action, then the SQLite session record is deleted/revoked, the cookie is cleared, and the user is redirected to `/login`.
- [x] **AC-6 (Route Protection & Middleware)**: Given an unauthenticated user attempting to access `/issues` or any sub-route, when requested, then the system intercepts the request and redirects to `/login`.
- [x] **AC-7 (Guest Route Redirection)**: Given an authenticated user with an active session in SQLite, when navigating to `/login` or `/register`, then the system redirects them to `/issues`.
- [x] **AC-8 (Session Persistence Across Restarts)**: Given an active session in SQLite, when the server restarts or a new request arrives within the expiration window, the session remains valid.

## 5. Edge Cases & Error Handling
- **Expired Sessions**: Automatically clean up or reject expired sessions from SQLite and clear cookie.
- **Password Length Boundary**: Strict minimum 8 characters; maximum 72 characters (bcrypt limit).
- **Email Normalization**: Lowercase and trim emails prior to querying and saving to prevent casing duplicates.
