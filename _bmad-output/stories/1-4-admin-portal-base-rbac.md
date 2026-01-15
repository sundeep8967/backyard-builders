# Story 1.4: Admin Portal Base (RBAC)

Status: in-progress

## Story
As an **Administrator**,
I want to log in with special permissions and access a restricted admin dashboard,
So that I can manage leads, projects, and platform settings without unauthorized access.

## Acceptance Criteria
1. **Given** a user is on the sign-in page, **Then** a "Sign in as Admin" option (or auto-redirect based on role) is available.
2. **Given** a user logs in, **Then** the system checks their role (e.g., in Supabase `usermeta` or a `roles` table).
3. **Given** an authorized admin, **Then** they are redirected to `/admin/dashboard`.
4. **Given** a standard user tries to access `/admin/*`, **Then** they are redirected to `/dashboard` or a 403 Forbidden page.
5. **Given** the admin dashboard, **Then** it has a distinct layout/sidebar to differentiate from the customer portal.

## Tasks
- [ ] Create/Update `roles` table or schema in Supabase (or use custom claims).
- [x] Update `useAuth` context to fetch and store user role.
- [ ] Create `middleware.ts` (or update existing) to protect `/admin/*` routes.
- [ ] Implement "Sign in as Admin" flow (can just be email/pass with specific domain or predefined list).
- [ ] Create/Confirm `AdminLayout` with distinct sidebar (already exists, verify).

## Technical Notes
- **Role Storage**: Can store in `public.users` table as `role: 'admin' | 'customer'`.
- **Middleware**: Next.js middleware is best for route protection.
- **Mocking**: For "Demo Mode", allow toggling 'Admin Mode' or have a 'Demo Admin' button.
