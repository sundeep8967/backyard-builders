# Project Context: Construction (Backyard Builders)

## 1. Project Overview
**Name:** Construction (Brand TBD)
**Goal:** High-end construction platform with verified onboarding, estimates, and project management.
**Status:** Greenfield (New Build) but with Mature Architecture specificaitons.

## 2. Tech Stack (Strict)
*   **Frontend:** Next.js (App Router), React, Tailwind CSS, shadcn/ui (Mandatory).
*   **State:** TanStack Query (Server), Zustand (Client), XState (Wizards).
*   **Backend:** Node.js, oRPC (Type-safe API), Prisma ORM.
*   **Database:** PostgreSQL (Supabase).
*   **Auth:** Clerk (Authentication) + Supabase (Database).
*   **Hosting:** Vercel (Frontend), Railway (Backend/Cron).
*   **Repo:** Turborepo (Monorepo), Biome (Linting).

## 3. Core Architecture Rules
1.  **Type Safety:** End-to-end type safety via oRPC and Shared Zod Schemas.
2.  **Transactions:** Onboarding Account+Household creation MUST be atomic. Property creation separate.
3.  **Validation:** Zod schemas for all inputs.
4.  **Multi-Tenancy:** "Inheritance and Override" model supported in DB schema via `company_id`.

## 4. Key Workflows
*   **Onboarding:** Zip Check -> Account Form -> DB Tx 1 (User/Household) -> DB Tx 2 (Property) -> Dashboard.
*   **Estimates:** Verified service conditions -> Design Center -> Proposal.

## 5. SEO Strategy
*   **SSR:** All public pages must be Server-Side Rendered (Next.js).
*   **Performance:** Core Web Vitals < 2.5s LCP.
*   **Semantic HTML:** Proper H1-H6 hierarchy.

## 6. Implementation Status
*   **Specs:** Complete (Requirements Index, Tech Stack, Architecture Index).
*   **Code:** Not started.
