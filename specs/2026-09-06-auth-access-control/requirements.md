# Feature Requirements: Authentication & Access Control

## 1. Context & Business Intent
As defined in `specs/mission.md` and `specs/roadmap.md` (Phase 1), SpecForge requires an authentication and access control system so that users can securely register, log in, manage their session, and access protected issue tracking functionality.

## 2. Scope

### In-Scope
- **User Credential Model**: User entity storing unique `email`, `passwordHash`, `name`, `createdAt`, and `updatedAt`.
- **Password Security**: Cryptographic hashing using `bcryptjs` (salt rounds >= 10).
- **Session Management**: Stateless, encrypted HTTP-only session cookies powered by signed JWT tokens using `jose`.
- **Registration**: Public registration form (`/register`) accepting email, name, and password with validation.
- **Login & Logout**: Secure login form (`/login`) verifying credentials and setting cookies; logout action terminating session.
- **Route Access Protection**: Next.js middleware guarding `/issues/*` for authenticated users, redirecting guests to `/login`, and redirecting logged-in users away from guest-only pages (`/login`, `/register`).
- **Auth State in UI**: Navigation header dynamically displaying user profile/name and Sign Out button when authenticated, or Login/Register buttons when unauthenticated.

### Out-of-Scope (Non-Goals)
- OAuth social logins (Google, GitHub).
- Email verification links or password reset emails.
- Multi-factor authentication (MFA / 2FA).
- Multi-tenant role management (RBAC / admin consoles).

## 3. Constraints & Dependencies
- **Modularity Constraint**: All source and specification files must remain strictly under 300 lines.
- **Security**: No plaintext passwords in database or logs; session cookies must be `HttpOnly`, `SameSite=Lax`, and `Secure` in production.
- **Dependencies**: `bcryptjs`, `jose`, `zod` for input validation.

## 4. Acceptance Criteria
- [ ] **AC-1 (User Registration)**: Given valid registration data (unique email, password >= 8 chars, name), when submitted via `/register`, then a new User record is created with a hashed password and an active session cookie is established.
- [ ] **AC-2 (Duplicate Email Prevention)**: Given an email that already exists in the database, when a user attempts registration with that email, then the system returns a descriptive 400 error message without creating duplicate records.
- [ ] **AC-3 (User Login)**: Given valid user credentials, when submitted via `/login`, then the system verifies the password against `passwordHash`, sets an encrypted session cookie, and redirects the user to `/issues`.
- [ ] **AC-4 (Invalid Credentials Handling)**: Given incorrect email or password, when submitted to `/login`, then the system rejects the request with an invalid credentials error and sets no session cookie.
- [ ] **AC-5 (User Logout)**: Given an authenticated user, when invoking the logout action, then the session cookie is cleared and the user is redirected to `/login`.
- [ ] **AC-6 (Route Protection & Middleware)**: Given an unauthenticated user attempting to access `/issues` or any sub-route, when requested, then the middleware intercepts the request and redirects to `/login`.
- [ ] **AC-7 (Guest Route Redirection)**: Given an authenticated user with an active session, when navigating to `/login` or `/register`, then the middleware redirects them to `/issues`.

## 5. Edge Cases & Error Handling
- **Malformed JWT / Expired Tokens**: Clear cookie and treat as unauthenticated guest.
- **Password Length Boundary**: Strict minimum 8 characters; maximum 72 characters (bcrypt limit).
- **Email Normalization**: Lowercase and trim emails prior to querying and saving to prevent casing duplicates.
