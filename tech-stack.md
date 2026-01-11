# Technology Stack

**Version:** v4  
**Last Updated:** 2025-01-XX  
**Status:** Active

---

## Overview

The platform uses a modern technology stack optimized for type safety, developer experience, and scalability. All technology choices prioritize type safety, developer productivity, and maintainability.

## Programming Languages & Runtime

### Node.js
- **Version:** >=20.0.0
- **Usage:** Runtime environment for backend services
- **Rationale:** Node.js 20+ provides modern JavaScript features, improved performance, and long-term support

### TypeScript
- **Usage:** Type safety for both frontend and backend code
- **Rationale:** TypeScript provides compile-time error detection, better IDE support, and improved code maintainability. It enables type-safe communication between frontend and backend through shared schemas.

## Frontend Framework & Libraries

### Core Framework
- **Next.js:** React framework with App Router for server-side rendering, routing, and performance optimizations
- **React:** UI library for building component-based interfaces
- **Rationale:** Next.js provides excellent developer experience, performance optimizations, SEO capabilities, and seamless deployment to Vercel.

### Styling
- **Tailwind CSS:** Utility-first CSS framework with design tokens for styling
- **shadcn/ui:** The exclusive and mandatory component library (no other component libraries permitted)
- **Rationale:** Tailwind CSS provides utility-first styling with design tokens. shadcn/ui ensures design consistency and provides accessible, customizable components.

### State Management
- **TanStack Query:** Server state management for asynchronous data fetching
- **Zustand:** Global client state management for ephemeral, client-only state
- **XState:** State machine library for multi-step "New Estimate Wizard" workflow
- **Rationale:** 
  - TanStack Query handles server state efficiently with caching, background updates, and error handling
  - Zustand provides lightweight global state for UI state that doesn't belong in server state
  - XState provides robust state management for complex wizard flows with clear state transitions

### Development & Testing Tools
- **MSW (Mock Service Worker):** Primary tool for Schema-First Workflow, enabling frontend development against mock APIs
- **Konva:** 2D canvas library for the polygon editor feature (strictly limited to Design Center > Shape & Size > Customize page)
- **Rationale:** 
  - MSW enables parallel frontend/backend development by providing reliable API mocks
  - Konva provides powerful 2D canvas capabilities for the specific polygon editor use case

## Backend Framework & Libraries

### API Framework
- **oRPC:** Type-safe API framework ensuring end-to-end type safety between frontend and backend
- **Rationale:** oRPC provides type-safe APIs without code generation overhead. It integrates seamlessly with TypeScript and shared Zod schemas.

### Database & ORM
- **Prisma:** The exclusive and mandatory ORM for type-safe database access
- **Rationale:** Prisma ensures type-safe database queries, migrations, and schema management. It provides excellent developer experience and type safety.

### Validation & Business Logic
- **Zod:** Schema validation (from shared package) for runtime type checking
- **Jexl:** Unified, sandboxed engine for executing calculation formulas and business rules
- **Rationale:** 
  - Zod provides runtime validation and type inference from schemas
  - Jexl provides a safe, sandboxed environment for executing user-defined formulas and business rules

### Security
- **Arcjet:** Developer-first security platform for bot protection, rate limiting, and email validation
- **Rationale:** Arcjet provides comprehensive security without requiring custom implementation, reducing development time and ensuring security best practices.

## Database & Data Management

### Database
- **PostgreSQL:** Primary database (via Supabase)
- **Supabase:** Database provider and backend services
- **Rationale:** PostgreSQL provides robust relational database capabilities. Supabase provides managed PostgreSQL with additional features like real-time subscriptions and authentication.

### Schema Management
- **Prisma Migrate:** Database schema change management tool
- **Rationale:** Prisma Migrate ensures version-controlled schema changes with type safety and rollback capabilities.

### Data Seeding
- **Data Seeding Scripts:** Comprehensive set of data seeding scripts for populating clean database with foundational data (core part of QA workflow)
- **Rationale:** Data seeding scripts enable consistent testing environments and QA workflows.

## Development Tools

### Monorepo Management
- **Turborepo:** Monorepo management and build orchestration
- **pnpm:** Package manager (required for workspace support)
- **Rationale:** 
  - Turborepo provides efficient monorepo builds with caching and parallel execution
  - pnpm provides fast, disk-efficient package management with proper workspace support

### Code Quality
- **Biome:** Linting & formatting (replaces ESLint + Prettier)
- **Rationale:** Biome provides fast linting and formatting in a single tool, improving developer experience and build performance.

### Component Development
- **Storybook:** Component development & visual testing
- **Rationale:** Storybook enables component-driven development, isolated component testing, and visual regression testing.

### CI/CD
- **GitHub Actions:** CI/CD pipeline automation
- **Rationale:** GitHub Actions provides integrated CI/CD with quality checks on PRs, automatic deployment to staging, and manual promotion to production.

## Deployment & Hosting

### Frontend Hosting
- **Vercel:** Frontend hosting with global CDN, performance optimizations, and seamless Next.js integration
- **Rationale:** Vercel provides optimal Next.js deployment experience with global CDN, automatic optimizations, and seamless integration.

### Backend Hosting
- **Railway:** Backend hosting for oRPC API service and scheduled background jobs
- **Rationale:** Railway provides flexible backend hosting with cron job support, easy deployment, and scaling capabilities.

### Database Hosting
- **Supabase:** Database hosting and management
- **Rationale:** Supabase provides managed PostgreSQL with additional features, backups, and scaling capabilities.

### CI/CD Pipeline
- **GitHub Actions:** CI/CD pipeline (quality checks on PRs, automatic deployment to staging on merge to main, manual promotion to production)
- **Rationale:** GitHub Actions provides integrated CI/CD with automated quality gates and deployment workflows.

## External Services & APIs

See [`external-services.md`](./external-services.md) for detailed information about external service integrations.

## Related Documentation

- [`service-architecture.md`](./service-architecture.md) - How the tech stack is used in the architecture
- [`repository-structure.md`](./repository-structure.md) - How the tech stack is organized in the monorepo
- [`external-services.md`](./external-services.md) - External service integrations
- [`development-tools.md`](./development-tools.md) - Development tooling details
- [`deployment.md`](./deployment.md) - Deployment and hosting details

