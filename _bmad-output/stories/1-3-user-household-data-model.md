# Story 1.3: User & Household Data Model + Firebase Auth Setup

Status: review

## Story
As a developer,
I want to set up Firebase Auth, Supabase server client, and define the core data models,
So that I have a secure foundation for user authentication and data storage.

## Acceptance Criteria
1. ✅ **Given** the app **Then** Firebase Auth is configured with Google Sign-in.
2. ✅ **Given** the backend **Then** Supabase client uses service role key (server-only).
3. ✅ **Given** the database **Then** core tables exist: users, households, properties.
4. ✅ **Given** a user signs in **Then** their Firebase UID is stored in Supabase.
5. ✅ **Given** API routes **Then** they verify Firebase tokens before accessing Supabase.

## Tasks / Subtasks
- [x] Install Firebase
    - [x] Run `pnpm add firebase firebase-admin`
    - [x] Create `lib/firebase/client.ts` (public config)
    - [x] Create `lib/firebase/admin.ts` (server-only, for token verification)
    - [x] Add Firebase env vars to `.env.example`
- [x] Configure Supabase Server Client
    - [x] Create `lib/supabase/server.ts` with service role key
    - [x] Remove public Supabase client (not needed)
    - [x] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.example`
- [x] Define Database Schema
    - [x] Create SQL migration file for: users, households, properties, household_members
    - [x] Define relationships and indexes
- [x] Create Auth API Route
    - [x] Create `app/api/auth/sync/route.ts` to sync Firebase user to Supabase
    - [x] Create helper `lib/api/with-auth.ts`
- [x] Create Base API Structure
    - [x] Create `app/api/users/route.ts`
    - [x] Create `app/api/properties/route.ts`

## Dev Notes
**Architecture:**
- Firebase Auth: Client-side Google Sign-in
- Supabase: Server-side only, accessed via API routes
- No RLS needed - API routes handle authorization
- Lazy initialization to prevent build-time errors

## File List
- apps/web/lib/firebase/client.ts
- apps/web/lib/firebase/admin.ts
- apps/web/lib/supabase/server.ts
- apps/web/lib/api/with-auth.ts
- apps/web/app/api/auth/sync/route.ts
- apps/web/app/api/users/route.ts
- apps/web/app/api/properties/route.ts
- apps/web/supabase/migrations/001_initial_schema.sql
- apps/web/.env.example

## Dev Agent Record
### Agent Model Used
Google Gemini 2.5 Pro

### Completion Notes
- Installed Firebase (client + admin) packages
- Created Firebase client config for browser-side Google Sign-in
- Created Firebase Admin SDK with lazy initialization for token verification
- Created Supabase server client with lazy initialization (service role key)
- Removed public Supabase client - all DB access goes through API routes
- Created database schema SQL with users, households, properties, household_members tables
- Created auth sync API route to sync Firebase users to Supabase
- Created withAuth middleware helper for protected API routes
- Created users and properties API routes
- Build passes successfully
