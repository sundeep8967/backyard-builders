# Feature Blueprint

**Date:** 2025-11-14 || 19:49

**Note:** This document provides high-level feature descriptions and business context. Detailed Functional Requirements (FRs) for each feature are located in the corresponding feature specification documents. See the [Requirements Index](./requirements-index.md) for complete traceability of all FRs and NFRs.

### Theme 1: Platform Foundations & Core Experience

These foundational features provide the core infrastructure and user experience elements for the platform.

#### Feature: `auth` (Authentication)

**Description:** Manages user sign-up, login, sessions, and the "Impersonation" model. It acts as the secure front door to the application.

**Key Purpose/Business Value:** Provides secure authentication using Clerk. Supports impersonation (MVP) transitioning to delegated authority (post-MVP). Employee/customer deactivation includes automatic work re-assignment and communication re-routing.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- All session and password management handled by Clerk (third-party service)
- MVP supports permission-aware "Impersonation" feature for high-privilege users (In-App Admin) and read-only impersonation for Design Advisors
- Post-MVP vision: "Delegated Authority" model where employees are always themselves but granted temporary permission to act on behalf of users
- When employees or customers are deactivated, system must automatically re-route communications and re-assign work
- First login completion triggers `onboarding_state.first_login_completed = true` to enable dashboard access

**Feature Boundaries:**
- Owns authentication flows, session management, and account creation
- Integrates with onboarding state machine to enforce feature gating
- Does not own user profile management (handled by `users` feature)
- Does not own password reset flows (handled by Clerk)

**Detailed Specifications:**
**See:** [`../features/auth-feature-spec.md`](../features/auth-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `dashboard`

**Description:** Serves as the primary landing page after login, presenting a consolidated, role-based view of a user's relevant items and tasks.

**Key Purpose/Business Value:** Provides personalized mission control with role-specific widgets (e.g., "My Tasks" for internal users, "What Happens Next?" timeline for customers).

**Primary Users:** All authenticated users (customers and employees)

**Key Business Rules:**
- Dashboard is a summary and launchpad, not a workspace - clicking items navigates to owning feature
- Must render different layouts based on user role
- Must enforce onboarding completion criteria and feature gating rules
- "What Happens Next?" timeline for customers is derived in real-time from operational data status (not stored separately)
- "My Tasks" widget aggregates all to-do items from assigned projects for internal users
- First-login experience includes "Get Started" prompt and optional "Product Tour" (separate features)

**Feature Boundaries:**
- Owns dashboard layout, widget rendering, and role-based view logic
- Does not own the business logic for items displayed (delegates to owning features)
- Does not own task creation or management (tasks come from other features)
- Provides structural slots for other features' components but does not contain their logic

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-dashboard) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `directory`

**Description:** Serves as the central "Contacts App" or Rolodex for the entire business. It is the single source of truth for every external person and company.

**Key Purpose/Business Value:** Prevents data duplication by centralizing all `People` and `Company` records, ensuring consistency and scalability.

**Primary Users:** Internal users (Project Managers, Design Advisors, In-App Admins, Customer Service Managers)

**Key Business Rules:**
- Must be the only place where `Person` and `Company` records are created and managed
- Other features must reference directory records, not store their own copies
- Companies must support `company_type` field (Subcontractor, Vendor, Government Agency, Franchisee, Other)
- Company deactivation uses soft delete (`is_active` flag) - only System Admin can deactivate
- Deactivated companies remain in historical records but are hidden from new selection lists
- All directory queries must be company-scoped (filter by `company_id = user.company_id`)

**Feature Boundaries:**
- Owns all `People` and `Company` record creation, updates, and management
- Other features must link to directory records, not duplicate them
- Does not own relationships between people/companies and other entities (handled by owning features)
- Supports extensibility for new company types without refactoring entire system

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-directory) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `help`

**Description:** Provides users with self-service support and contextual guidance.

**Key Purpose/Business Value:** Searchable knowledge base with contextual "?" icons linking to relevant help articles.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- Must be for static, self-service content only
- Must not include any live chat or human-powered support functionality (handled by `messaging` feature)
- Contextual "?" icons link directly to relevant help articles
- Help articles can be company-specific (Post-MVP feature) - MVP uses global articles
- Product Tour accessible from Help menu at any time

**Feature Boundaries:**
- Owns knowledge base content, search functionality, and contextual help integration
- Does not own live chat or real-time support (handled by `messaging` feature)
- Does not own user onboarding flows (handled by onboarding state machine)

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-help) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `messaging`

**Description:** Owns the entire real-time communication platform for informal, chat-style conversations.

**Key Purpose/Business Value:** Unified communication hub with contextual threads linked to specific entities (projects, invoices, files). Supports both internal-only and customer-visible threads.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- All conversations organized into threads linked to specific entities (polymorphic relationship)
- Thread visibility must be clearly indicated ("Internal Only" vs. "Visible to Customer")
- Thread visibility can be changed after creation with restrictions (24-hour cooldown, permission checks)
- Supports @mentions, read receipts (opt-out), emoji reactions, file attachments
- Uses WebSockets (Socket.io) for real-time communication
- Must implement at-least-once delivery model with retry logic
- Orphaned thread detection via scheduled background job
- Separation from contextual notes: messaging for conversation, contextual notes for permanent record

**Feature Boundaries:**
- Owns all real-time messaging functionality, thread management, and message delivery
- Does not own contextual notes (formal, one-way annotations handled by separate service)
- Does not own notification delivery (handled by `notifications` feature)
- Threads can reference any entity type via polymorphic relationship

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-messaging) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `navigation`

**Description:** Responsible ONLY for rendering the correct, role-based sidebars and managing the application's top-level layout.

**Key Purpose/Business Value:** Logic-less navigation system that determines which navigation elements to display based on user role and context.

**Primary Users:** All authenticated users

**Key Business Rules:**
- Intentionally "logic-less" - renders navigation elements but does not contain business logic for items
- Provides structural "slot" for search bar but contains no search functionality itself
- Renders link to "Message Center" but does not know unread message count (provided by `messaging` feature)
- Must implement complete role-based navigation menu structure for each role
- Navigation items displayed in specified order with conditional visibility rules

**Feature Boundaries:**
- Owns navigation rendering, layout structure, and role-based menu determination
- Does not own business logic for navigation items (delegates to owning features)
- Does not own search functionality (provides slot for `search` feature component)
- Does not own unread counts or badges (provided by owning features)

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-navigation) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `notifications`

**Description:** Owns the system for generating and displaying all asynchronous user alerts.

**Key Purpose/Business Value:** Delivery mechanism for in-app notifications and emails, with role-based default preferences and retry logic for failed deliveries.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- Feature is a delivery mechanism - business logic for triggering notifications resides in owning features
- Clicking notification must deep-link user directly to relevant content
- Notification Center icon displays badge with count of unread notifications
- Three-tier preference hierarchy: User Preference (highest) → Company Default → System Default (lowest)
- Must implement retry logic for failed deliveries (up to 3 attempts with exponential backoff)
- Notification status state machine: Pending → Sent/Delivered/Retrying → Failed
- Must use job queue system (Redis-backed) for reliable delivery
- Delivery latency targets: in-app within 5 seconds, email within 30 seconds

**Feature Boundaries:**
- Owns notification delivery, preference management, and retry logic
- Does not own business logic for when to send notifications (owning features decide)
- Does not own notification content creation (provided by owning features)
- Provides delivery infrastructure but features trigger notifications

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-notifications) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `search`

**Description:** Owns all functionality related to finding specific entities within the application through user queries.

**Key Purpose/Business Value:** MVP scope limited to searching for `Projects` and `Customers` by name, with long-term vision for global "omni-search".

**Primary Users:** Internal users (all employee roles)

**Key Business Rules:**
- MVP scope: search `Projects` and `Customers` by name only
- Must be built as self-contained component renderable by `navigation` feature
- Case-insensitive, partial match searches (minimum 2 characters, 300ms debounce)
- Maximum 20 results per entity type (40 total maximum)
- All search queries must be company-scoped (filter by `company_id = user.company_id`)
- Exception: System Admins can search across all companies
- Results grouped by type (Projects section, Customers section)

**Feature Boundaries:**
- Owns search functionality, query logic, and result display
- MVP limited to Projects and Customers - future expansion to other entities
- Must be self-contained component with callback API for parent navigation
- Does not own navigation to results (parent component handles)

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-search) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `showcase`

**Description:** The public-facing "Inspiration" gallery and "Shop the Look" functionality.

**Key Purpose/Business Value:** Curated gallery of completed projects with "Shop the Look" workflow that creates new estimates pre-loaded with design selections.

**Primary Users:** Public users (no authentication required), Customers, In-App Admins (for curation)

**Key Business Rules:**
- Public-facing gallery - no authentication required to browse
- Projects must meet eligibility criteria: status 'Complete', customer permission, quality standards, minimum 3 photos
- "Shop the Look" reads `selections` JSONB from source project's `estimate_version` to pre-populate new estimate
- Showcase projects allowed to contain deactivated items (historical accuracy)
- Warning badge displayed if showcase project contains deactivated items
- When "Shop the Look" used, system validates items and flags deactivated items for replacement
- In-App Admin can curate, update, and remove showcase projects
- Display 12 projects per page with pagination

**Feature Boundaries:**
- Owns showcase gallery, curation workflow, and "Shop the Look" import initiation
- Does not own estimate creation or design process (delegates to `estimates` feature)
- Passes selected project configuration to `estimates` feature for processing
- Does not own project completion or photo management (handled by `projects` feature)

**Detailed Specifications:**
**See:** [`../features/showcase-feature-spec.md`](../features/showcase-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `users`

**Description:** Manages a user's personal identity within the app and their relationships within a household.

**Key Purpose/Business Value:** Personal profile management and household collaboration model with Owner/Member role distinction for legally binding actions.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- Must enforce permission distinction between `'Owner'` and `'Member'` roles
- Only `'Owner'` can perform legally binding actions (accept estimates, sign contracts, approve change orders, authorize payments)
- Household created automatically in same transaction as new customer account
- Default household display name generated from owner names
- Household Owner can invite partners/family members with role assignment
- Invitation workflow with secure, time-limited links (default 7 days, configurable)
- Invitation expiration enforced via scheduled job and on-demand checks
- System prevents deactivation of only Owner in household
- Account Settings page for profile management (name, photo, phone, notification preferences)

**Feature Boundaries:**
- Owns user profile management, household management, and account settings
- Does not own authentication flows (handled by `auth` feature)
- Does not own password management (handled by Clerk)
- Does not own notification preference UI (provides link to `notifications` feature)
- Owns household collaboration model but does not own project/estimate access (handled by owning features)

**Detailed Specifications:**
**See:** [`../features/platform-foundations-feature-spec.md`](../features/platform-foundations-feature-spec.md#feature-users) for complete workflows, state machines, edge cases, and implementation rules.

### Theme 2: Customer Acquisition & Quoting

These features manage the complete pre-contract customer journey from property setup through estimate creation, design center interaction, and site visit request.

#### Feature: `advisor`

**Description:** Owns the complete sales and proposal workflow, from lead assignment to the final signed contract and handoff.

**Business Value:** Orchestrates the critical human-in-the-loop handoff between customers and Design Advisors, ensuring trust-building through professional interactions, accurate on-site validation, and transparent contract generation with guaranteed price locks.

**Primary Users:** Design Advisors, Customers, Project Managers

**Key Business Rules:**
- Design Advisors must use "Duplicate for Proposal" workflow to edit customer estimates (never edit directly)
- Price lock is established when customer accepts estimate and applies to all future calculations for that property
- Contract creation requires on-site validation completion and follows strict sequence: tax calculation → PDF generation → sending
- Project creation only occurs after both signed contract and down payment are confirmed

**Feature Boundaries:**
- Owns: Lead assignment, site visit scheduling, on-site validation, contract preparation, handoff summary workflow, appointment management
- Handoffs: Receives estimates from `estimates` feature, hands off projects to `projects` feature, uses `pricing` feature for calculations

**Detailed Specifications:**
**See:** [`../features/advisor-feature-spec.md`](../features/advisor-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `estimates`

**Description:** Provides the pre-contract "sandbox" for designing a project. This is the core of the customer's creative experience.

**Business Value:** Enables customers to explore design options interactively through the New Estimate Wizard and Design Center, with real-time price updates and intelligent compatibility guidance to prevent design errors before they occur.

**Primary Users:** Customers, Design Advisors

**Key Business Rules:**
- Feature responsibility ends upon "Accept & Request Visit" action (hands off to advisor feature)
- Three active estimates per property limit enforced before creation
- Price calculations debounced (500ms) with rate limiting (10 per minute) for performance
- Saved configurations must validate items on application and require replacement of deactivated items

**Feature Boundaries:**
- Owns: New Estimate Wizard, Design Center, estimate duplication, saved configurations, 2D editor validation, wizard state persistence
- Handoffs: Hands off to `advisor` feature when customer accepts estimate, uses `pricing` feature for all calculations

**Detailed Specifications:**
**See:** [`../features/estimates-feature-spec.md`](../features/estimates-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `pricing`

**Description:** The authoritative engine for all cost and quantity calculations. It is a backend-only service with no user interface in the main application.

**Business Value:** Provides consistent, transparent pricing calculations across all features through a strict four-stage pipeline (Variable Resolution → Quantity Takeoff → Pricing & Rules → Tax Calculation), ensuring customers receive accurate, locked pricing throughout their sales cycle.

**Primary Users:** System (used by other features), Design Advisors

**Key Business Rules:**
- Owns the four-stage calculation pipeline (Variable Resolution → Quantity Takeoff → Pricing & Rules → Tax Calculation)
- Price lock entitlement established when customer accepts estimate, consumed when project is created
- All calculations use locked pricing from property's active_price_lock_timestamp
- Tax calculation based on verified property address

**Feature Boundaries:**
- Owns: All cost and quantity calculations, price lock management, quantity takeoff engine, tax calculation
- Handoffs: Used by `estimates` and `advisor` features for price calculations; no direct user interface

**Detailed Specifications:**
**See:** [`../features/pricing-feature-spec.md`](../features/pricing-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `property`

**Description:** Owns the workflow for capturing, managing, and verifying the "Existing Conditions" of a customer's physical property.

**Business Value:** Creates a locked, auditable record of site conditions that all future pricing and planning is based on. Ensures accurate project scoping through verified property data.

**Primary Users:** Customers (provide data), Design Advisors (verify data)

**Key Business Rules:**
- First property profile is required for dashboard access (onboarding prerequisite)
- Once a service's existing conditions are verified by a DA, that section becomes read-only
- Adding unverified services to verified estimates triggers additional site visit workflow
- Address validation uses Google Maps API with graceful error handling

**Feature Boundaries:**
- Owns: Property profile creation, address validation, existing conditions capture and verification, additional site visit scheduling
- Handoffs: Verified property data feeds into `estimates` and `pricing` features; integrates with `advisor` for site visit scheduling

**Detailed Specifications:**
**See:** [`../features/property-feature-spec.md`](../features/property-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

### Theme 3: Project Execution & Delivery

Features that manage the active project build phase and operational workflows.

#### Feature: `files`

**Description:** Provides all shared, reusable UI components and logic for file and photo management.

**Business Value:** Smart digital filing cabinet with virtual folder structure and automatic folder generation for new projects.

**Primary Users:** All users (customers and employees)

**Key Business Rules:**
- Virtual folder structure for file organization
- Automatic folder generation for new projects
- Shared, reusable UI components for file and photo management across features

**Feature Boundaries:**
- Owns: File and photo management UI components, virtual folder structure, automatic folder generation
- Does not own file storage or CDN integration (handled by infrastructure)
- Provides shared components used by other features (projects, messaging, etc.)

**Detailed Specifications:**
**See:** [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md#feature-files) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `geofencing` [Post-MVP]

**Description:** Automates on-site event tracking using virtual boundaries around job sites.

**Business Value:** Automatic arrival/departure logging for Field Crew using mobile devices, with PM notifications for missed arrivals.

**Primary Users:** Field Crew, Project Managers

**Key Business Rules:**
- Location-based project tracking using virtual boundaries around job sites
- Automatic arrival/departure logging for Field Crew using mobile devices
- PM notifications for missed arrivals

**Feature Boundaries:**
- Owns: Geofencing boundary definition, arrival/departure event tracking, missed arrival notifications
- Integrates with mobile devices for location tracking
- Post-MVP feature - not included in initial MVP scope

**Detailed Specifications:**
**See:** [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md#feature-geofencing-post-mvp) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `projects`

**Description:** Owns the entire post-contract operational workflow, serving as the command center for the build phase.

**Business Value:** Manages the complete project lifecycle from contract signing through completion, ensuring customers stay informed and projects stay on track. Provides the "Living Contract" hub showing contract value and all change orders.

**Primary Users:** Customers, Project Managers, Field Crew

**Key Business Rules:**
- Three-phase lifecycle (Pre-Construction, Construction, Post-Completion) driven by anchor dates
- Change orders follow mandatory two-step approval workflow (PM review → Customer approval)
- Schedule of Values (SOV) must be approved before billing; approved change orders trigger SOV revision
- Selection deadlines block project start until required selections are completed
- All operations that change the project's financial or contractual state (e.g., approving a change order, revising the SOV) **MUST** use pessimistic locking to prevent data conflicts

**Feature Boundaries:**
- Owns: Project lifecycle management, change order workflow, SOV control, selection deadline management, daily logs, construction schedule
- Handoffs: Receives projects from `advisor` feature after handoff; hands off to `warranty` feature upon completion; integrates with `financials` for billing control

**Detailed Specifications:**
**See:** [`../features/projects-feature-spec.md`](../features/projects-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `rfi` (Request for Information)

**Description:** Owns the complete workflow for creating, managing, and answering formal, auditable Requests for Information.

**Business Value:** Formal communication channel for trackable, auditable questions and answers, usable pre-contract by Design Advisors.

**Primary Users:** Project Managers, Design Advisors, Customers

**Key Business Rules:**
- Formal, auditable communication channel for questions and answers
- Trackable workflow for RFI creation, management, and resolution
- Usable pre-contract by Design Advisors and post-contract by Project Managers

**Feature Boundaries:**
- Owns: RFI creation, management, and resolution workflow
- Provides formal, auditable communication separate from informal messaging
- Can be used across project lifecycle (pre-contract and post-contract)

**Detailed Specifications:**
**See:** [`../features/project-execution-feature-spec.md`](../features/project-execution-feature-spec.md#feature-rfi-request-for-information) for complete workflows, state machines, edge cases, and implementation rules.

### Theme 4: Business Operations & Intelligence

Features for business intelligence and financial operations.

#### Feature: `financials`

**Description:** Owns all post-contract monetary transactions, billing, and financial compliance workflows. It is the accounting department of the application.

**Business Value:** Ensures the company gets paid correctly and manages financial risk through controlled billing and payment workflows. Aligns operations and finance through SOV approval gates.

**Primary Users:** Accountants, Project Managers, In-App Admins

**Key Business Rules:**
- Invoices cannot be sent until Schedule of Values (SOV) status is `Active` (PM approval required)
- Credit memos require multi-step approval (Accountant → PM → In-App Admin) with $500 threshold
- Subcontractor invoice payments blocked until signed lien waiver is uploaded
- Invoice payment status (`Paid`, `Overdue`) is derived from payments, not stored
- All operations that modify financial state (e.g., approving a credit memo, sending an invoice after validation) **MUST** use pessimistic locking to guarantee data integrity

**Feature Boundaries:**
- Owns: Invoice creation and management, payment tracking, credit memo workflow, lien waiver compliance, SOV approval gate enforcement
- Handoffs: Receives SOV status from `projects` feature; integrates with payment processing systems

**Detailed Specifications:**
**See:** [`../features/financials-feature-spec.md`](../features/financials-feature-spec.md) for complete workflows, state machines, edge cases, and implementation rules.

#### Feature: `reporting`

**Description:** Owns all dashboards and business intelligence features that allow management to monitor and steer the company.

**Business Value:** Provides high-level "30,000-foot view" for management with project health dashboards, sales funnel reports, and customer satisfaction tracking. Read-only analysis tool.

**Primary Users:** Management, In-App Admins

**Key Business Rules:**
- Read-only reporting interface - no capability to edit underlying data
- Aggregates data from across the platform to provide actionable insights
- Provides project health dashboards, sales funnel reports, and customer satisfaction tracking

**Feature Boundaries:**
- Owns: Business intelligence dashboards, reporting analytics, data aggregation
- Does not own underlying data (read-only access to data from other features)
- Does not provide data editing capabilities

**Detailed Specifications:**
**See:** [`../features/business-operations-feature-spec.md`](../features/business-operations-feature-spec.md#feature-reporting) for complete specifications.

### Theme 5: Post-Completion & Support

Features for managing customer relationships and support after project completion.

#### Feature: `warranty`

**Description:** Manages the entire customer relationship, support tickets, and any claims after a project is marked as complete.

**Business Value:** Handles post-completion lifecycle with customer warranty claim portal and Warranty Coordinator dashboard for managing claims, scheduling service appointments, and assigning work orders.

**Primary Users:** Customers, Warranty Coordinators

**Key Business Rules:**
- Warranty workflows activate only after project `completion_date` is set and status transitions to "Complete"
- Customer portal for warranty claim submission and tracking
- Warranty Coordinator dashboard for managing claims, scheduling service appointments, and assigning work orders

**Feature Boundaries:**
- Owns: Warranty claim management, customer warranty portal, service appointment scheduling, work order assignment
- Handoffs: Receives completed projects from `projects` feature; integrates with `messaging` for customer communication

**Detailed Specifications:**
**See:** [`../features/business-operations-feature-spec.md`](../features/business-operations-feature-spec.md#feature-warranty) for complete specifications.

### Theme 6: System & Content Administration

Features for managing platform configuration and day-to-day business operations.

#### Feature: `admin-portal` (The "Factory")

**Description:** A secure, internal-only application (`admin.backyardbuilders.com`) for staff to manage the core data and business logic that powers the platform. Its sole responsibility is to configure the **Platform** itself—the universal rules, components, and physics that govern how the application works.

**Business Value:** Manages the master "Corporate Default" library of items, costs, and assembly recipes. Defines mathematical calculation and pricing formulas. Uses immutable versioning to preserve historical accuracy. All changes saved in `Draft` state and require explicit `Publish` action.

**Primary Users:** System Admins (The "Factory Engineers")

**Key Business Rules:**
- Immutable versioning: edits create new versioned records, never overwrite historical data
- Formula cycle detection prevents circular dependencies
- Master data deactivated (not deleted) to preserve historical integrity
- All changes logged to audit trail
- All changes saved in "Draft" state and require explicit "Publish" action

**Feature Boundaries:**
- Owns: Core platform data management (items, assemblies, products, templates, pricing rules), formula definitions, master data versioning
- Does not own day-to-day operational data (handled by `in-app-admin` feature)
- Separate application from main platform (admin.backyardbuilders.com)

**Detailed Specifications:**
**See:** [`../features/business-operations-feature-spec.md`](../features/business-operations-feature-spec.md#feature-admin-portal-the-factory) for complete specifications.

#### Feature: `in-app-admin` (The "Dealership")

**Description:** A high-permission role *within the main application* responsible for managing the day-to-day **Operations** of the business—the specific people, projects, and money flowing through the platform.

**Business Value:** Manages people (employee accounts, lead assignment), operations (master dashboards), and operational rules (Company Settings). Holds final approval authority on financial transactions like customer refunds and credit memos.

**Primary Users:** In-App Admins (The "Dealership Managers")

**Key Business Rules:**
- Design Advisor discounts exceeding threshold require In-App Admin approval
- Final binding approval authority for all customer credit memos
- Cannot modify core product data (exclusive domain of admin-portal)
- Manages Company Settings for operational rules (max discounts, offer validity periods, selection deadlines)

**Feature Boundaries:**
- Owns: Day-to-day operations management (people, projects, money), Company Settings, final financial approvals
- Does not own core product data management (exclusive domain of `admin-portal` feature)
- Operates within main application, not separate portal

**Detailed Specifications:**
**See:** [`../features/business-operations-feature-spec.md`](../features/business-operations-feature-spec.md#feature-in-app-admin-the-dealership) for complete specifications.

---

