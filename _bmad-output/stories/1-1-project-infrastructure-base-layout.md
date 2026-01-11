# Story 1.1: Project Infrastructure & Base Layout

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to initialize the project with Next.js, Tailwind, Shadcn UI, and Supabase,
So that I have a stable foundation for building feature stories.

## Acceptance Criteria

1. **Given** a clean directory **Then** initialize a Turborepo monorepo structure.
2. **Given** the monorepo **Then** create a `web` app using Next.js 14+ (App Router).
3. **Given** the `web` app **Then** configure Tailwind CSS and `shadcn/ui` with the "New York" style and "Zinc" color theme.
4. **Given** the project **Then** install & configure Biome for linting/formatting.
5. **Given** the `web` app **Then** implement a basic `index.tsx` (page.tsx) "Coming Soon" landing page.
6. **Given** the project **Then** ensure `pnpm` is used as the package manager.
7. **Given** the requirement **Then** set up the Supabase Client (browserside) and verify environment variable slots exist (.env.example).

## Tasks / Subtasks

- [x] Initialize Monorepo
    - [x] Run `npx create-turbo@latest .` (skip example, clean slate if possible, or use basic pnpm workspace manually if cleaner).
    - [x] Ensure `pnpm-workspace.yaml` is configured.
- [x] Create `apps/web` (Next.js)
    - [x] Run `npx create-next-app@latest apps/web --typescript --tailwind --eslint`.
    - [x] Clean up default Next.js boilerplate (remove SVG logos, default css).
- [x] Configure `shadcn/ui`
    - [x] Run `npx shadcn-ui@latest init` in `apps/web`.
    - [x] Select: Style=New York, Color=Zinc, CSS Variables=Yes.
- [x] Configure Biome
    - [x] Install `@biomejs/biome`.
    - [x] Create `biome.json` at root.
    - [x] Add lint/format scripts to package.json.
- [x] Supabase Setup
    - [x] Install `@supabase/supabase-js`.
    - [x] Create `lib/supabase/client.ts`.
    - [x] Add `.env.local.example` with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- [x] Landing Page
    - [x] Edit `app/page.tsx` to show a Hero section "Backyard Builders - Coming Soon".

## Dev Notes

**Architecture Compliance:**
*   **Monorepo:** Turborepo is mandatory.
*   **Package Manager:** pnpm is mandatory.
*   **Style:** Tailwind + shadcn/ui is mandatory.
*   **Linting:** Biome replaces ESLint+Prettier.

**Technical Context:**
*   Use `apps/` for applications and `packages/` for shared libs (UI kit, config).
*   For now, just putting shadcn components directly in `apps/web/components/ui` is fine for velocity, unless we plan multiple apps immediately. (Stick to `apps/web` for now).

### Project Structure Notes

- Root
    - apps/
        - web/ (Next.js)
    - packages/
        - ui/ (Optional, or just keep in web for now)
        - config/ (Biome, TSConfig)
    - pnpm-workspace.yaml
    - turbo.json

### References

- [Tech Stack](docs/tech-stack.md)
- [Architecture Index](docs/architecture-index.md)

## Dev Agent Record

### Agent Model Used
Google Antigravity

### Completion Notes List
- Initialized Monorepo with Turborepo manual setup
- Created Next.js 16 app (apps/web)
- Configured Tailwind v4 and Shadcn UI (New York/Zinc)
- Installed Biome and configured in root (linting/formatting)
- Created Supabase client (lib/supabase/client.ts)
- Removed default boilerplate and created "Coming Soon" landing page
- Verified build success

### File List
- package.json
- turbo.json
- pnpm-workspace.yaml
- .gitignore
- biome.json
- apps/web/package.json
- apps/web/app/page.tsx
- apps/web/app/globals.css
- apps/web/lib/supabase/client.ts
- apps/web/.env.example
- apps/web/components.json
- apps/web/lib/utils.ts
- apps/web/tailwind.config.ts
