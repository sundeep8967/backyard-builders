---
stepsCompleted: 
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments: 
  - requirements-index.md
  - architecture-index.md
  - onboarding-flow-detailed.md
---

# Construction (Backyard Builders) - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Construction (Backyard Builders), decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

*(Available in step-01 output, summarized here for brevity)*
- Total FRs: ~141 (covering Auth, Onboarding, Estimates, Pricing, Advisor, Projects, Financials, etc.)

### NonFunctional Requirements

*(Available in step-01 output, summarized here for brevity)*
- Total NFRs: ~42 (covering Security, Performance, Reliability, DevOps, etc.)

### Additional Requirements

- **Tech Stack:** Next.js, Shadcn UI, oRPC, Prisma, Supabase
- **Architecture:** Monorepo, SSR, Atomic Transactions
- **Blocking Rules:** Dashboard access blocked until property profile created

### FR Coverage Map

**Epic 1: Platform Foundation**
- FR1, FR2, FR3, FR5, FR6 (Auth)
- FR73-83 (Admin/In-App Admin)
- FR84-88 (Multi-Tenancy)
- FR57-59 (File Mgmt)
- FR89, FR90 (Search/Nav)
- FR63-65 (Notifications Core)
- NFR1-6 (Security), NFR27-31 (DevOps)

**Epic 2: Onboarding & Property**
- FR4, FR7, FR8, FR9 (Onboarding Flow)
- FR93, FR94 (Household/Profile)
- FR95, FR96 (Directory)
- FR98 (Dashboard)

**Epic 3: Estimates & Design Center**
- FR10-12 (Service Verification)
- FR13-15 (Estimates/Design Center)
- FR16-19 (Calculation/Validation)
- FR20, FR91, FR92 (Showcase)
- FR21-28 (Pricing Engine)
- NFR39 (Pricing Perf), NFR10-12 (Caching)

**Epic 4: Advisor Workflow**
- FR29-32 (Proposal Workflow)
- FR33-35 (Leads/Visits)
- FR37-40, FR43 (Advisor Tools/Contracts)
- FR42 (Contract Expiration)

**Epic 5: Projects & Financials**
- FR41 (Handoff)
- FR44, FR45, FR48-51 (Project Mgmt)
- FR46, FR47, FR52-56, FR81 (Financials/SOV)

**Epic 6: Communication & Reporting**
- FR60, FR61 (Messaging)
- FR62 (RFI)
- FR66 (Notification Triggers)
- FR67-69 (Reporting)
- FR97 (Help/KB)

**Epic 7: Warranty**
- FR70-72 (Warranty Claims)


## Epic List

### Epic 1: Platform Foundation & Authentication
**Goal:** Establish the secure, multi-tenant core infrastructure and administrative interfaces required to support the entire platform.
**Value:** Secure access for all user roles, robust admin capabilities, and a scalable multi-tenant architecture.
**FRs Covered:** FR1-3, FR5-6, FR57-59, FR63-65, FR73-90.

### Epic 2: Onboarding & Property Management
**Goal:** Enable new customers to create verified accounts, establish households, and register properties.
**Value:** Seamless "Zero to Dashboard" experience that ensures serviceability and data quality.
**FRs Covered:** FR4, FR7-9, FR93-96, FR98.

### Epic 3: Estimates & Design Center
**Goal:** Empower users to browse galleries, customize projects using the Design Center, and generate instant price estimates.
**Value:** Self-service discovery and pricing transparency that drives conversion.
**FRs Covered:** FR10-28, FR91-92.

### Epic 4: Advisor Workflow & Proposals
**Goal:** Equip Design Advisors to manage leads, conduct site visits, verify conditions, and generate formal contracts.
**Value:** Professionalizes the sales process and ensures technical feasibility before contract signing.
**FRs Covered:** FR29-40, FR42-43.

### Epic 5: Projects & Execution
**Goal:** Manage the active construction lifecycle from pre-construction through completion, including financial compliance.
**Value:** Operational control, financial accuracy, and on-time delivery.
**FRs Covered:** FR41, FR44-56, FR81.

### Epic 6: Communication & Reporting
**Goal:** Facilitate transparency through real-time messaging, centralized knowledge, and actionable business intelligence.
**Value:** Reduced friction, faster issue resolution, and data-driven decision making.
**FRs Covered:** FR60-62, FR66-69, FR97.

### Epic 7: Warranty & Post-Completion
**Goal:** Manage long-term customer relationships through warranty claims and service requests.
**Value:** Customer peace of mind and structured post-project support.
**FRs Covered:** FR70-72.


## Epic 1: Platform Foundation & Authentication
**Goal:** Establish the secure, multi-tenant core infrastructure and administrative interfaces required to support the entire platform.

### Story 1.1: Project Infrastructure & Base Layout
As a developer,
I want to initialize the project with Next.js, Tailwind, Shadcn UI, and Supabase,
So that I have a stable foundation for building feature stories.

**Acceptance Criteria:**
**Given** a clean git repository
**When** I initialize the project using the prescribed tech stack
**Then** the directory structure should match the monorepo specification
**And** Vercel deployment should be successful
**And** `index.tsx` should render a basic "Coming Soon" landing page
**And** Biome linting should be configured and passing

### Story 1.2: Authentication with Clerk
As a user,
I want to sign up and log in using Clerk,
So that I can securely access the platform.

**Acceptance Criteria:**
**Given** an unauthenticated user
**When** I navigate to a protected route
**Then** I should be redirected to the Clerk sign-in page
**And** I can sign in with Email/Password or Social Providers
**And** After login, I should be redirected back to the app
**And** My user ID should be accessible in the global state

### Story 1.3: User & Household Data Model
As a system,
I want to store user and household data in Supabase upon registration,
So that I can associate data with specific customers.

**Acceptance Criteria:**
**Given** a new user registers via Clerk
**When** the Clerk webhook fires
**Then** a corresponding `customer` record should be created in Supabase
**And** a `household` record should be created
**And** the user should be linked as the "Owner" of that household
**And** the `onboarding_state` JSON should be initialized to defaults

### Story 1.4: Admin Portal Base & RBAC
As an admin,
I want a secure /admin route restricted to specific roles,
So that I can manage system configurations safely.

**Acceptance Criteria:**
**Given** a logged-in user with "Admin" role
**When** I access `/admin`
**Then** I should see the Admin Dashboard
**But** if I am a "Customer" role, I should see a 403 Forbidden error
**And** the Admin layout should include a separate sidebar from the customer app

### Story 1.5: Navigation & Dashboard Shell
As a customer,
I want to see a navigation menu relevant to my role,
So that I can access the features I need.

**Acceptance Criteria:**
**Given** a logged-in Customer
**When** I view the dashboard
**Then** I should see links to "Projects", "Messages", and "Profile"
**And** appropriate mobile responsive menu (hamburger) should be working
**And** the layout should use the Design System (shadcn/ui) components

## Epic 2: Onboarding & Property Management
**Goal:** Enable new customers to create verified accounts, establish households, and register properties.

### Story 2.1: Zip Code Validation Service
As a prospective customer,
I want to verify my zip code before signing up,
So that I don't waste time if my area is not serviced.

**Acceptance Criteria:**
**Given** a visitor on the landing page
**When** I enter a zip code
**Then** the system should check the `serviceable_areas` table
**And** if valid, allow me to proceed to sign up
**And** if invalid, show a unified "Sorry, we don't serve this area yet" message

### Story 2.2: Multi-Step Account Creation Form
As a new user,
I want to guided wizard to enter my details,
So that the process feels easy and approachable.

**Acceptance Criteria:**
**Given** I passed zip code validation
**When** I proceed to the sign-up flow
**Then** I should see a multi-step form (Step 1: Auth, Step 2: Name/Info, Step 3: Address)
**And** I can navigate back and forth between steps
**And** data is preserved in session state if I refresh

### Story 2.3: Address Verification with Google Maps
As a system,
I want to validate user-entered addresses against Google Maps API,
So that I ensure accurate location data for service and tax calculations.

**Acceptance Criteria:**
**Given** I am on the Address Entry step
**When** I type an address
**Then** I should see Google Autocomplete suggestions
**And** selecting one should populate the structured fields (Street, City, State, Zip)
**And** the system should verify if this specific address is within the polygon of a service zone

### Story 2.4: Atomic Account Creation Transaction
As a developer,
I want account creation to be an all-or-nothing database transaction,
So that we never end up with orphaned user records without households.

**Acceptance Criteria:**
**Given** I submit the final onboarding step
**When** the backend processes the request
**Then** it must create `customer`, `household`, and `household_member` in a SINGLE transaction
**And** if any part fails, the entire creation must roll back
**And** the user receives a clear error message

### Story 2.5: Property Profile Creation & Dashboard Unlock
As a user,
I want to create my property profile immediately after account creation,
So that I can access the dashboard.

**Acceptance Criteria:**
**Given** I have successfully created an account
**When** the property profile transaction succeeds
**Then** the `property_profile` record is created
**And** `onboarding_state.property_address_entered` is set to TRUE
**And** I am finally redirected to the Main Dashboard
**And** attempting to bypass to dashboard before this succeeds redirects me back

## Epic 3: Estimates & Design Center
**Goal:** Empower users to browse galleries, customize projects using the Design Center, and generate instant price estimates.

### Story 3.1: Showcase Gallery
As a user,
I want to browse a gallery of completed projects,
So that I can get inspiration for my own project.

**Acceptance Criteria:**
**Given** I access the Showcase page
**When** I browse projects
**Then** I can filter by project type (e.g. Deck, Patio)
**And** clicking a project shows details and a "Shop this Look" button

### Story 3.2: Estimate Wizard - Service Selection
As a user,
I want to select the type of project I want to build,
So that the system can guide me through relevant options.

**Acceptance Criteria:**
**Given** I start a new estimate
**When** I select "New Deck"
**Then** the wizard initializes a new estimate draft
**And** configures the subsequent steps based on the deck-building workflow

### Story 3.3: Interactive Design Center (Canvas)
As a user,
I want to visually customize the shape and size of my project,
So that I can communicate exactly what I want.

**Acceptance Criteria:**
**Given** I am in the Shape & Size step
**When** I use the 2D canvas editor (Konva)
**Then** I can drag and resize the polygon shape
**And** the square footage is calculated in real-time
**And** the price estimate updates instantly

### Story 3.4: Material Selection & Pricing Engine
As a user,
I want to select materials and see the price update,
So that I can stay within my budget.

**Acceptance Criteria:**
**Given** I am on the Materials step
**When** I choose "Composite Decking" instead of "Wood"
**Then** the price updates based on the Pricing Engine formula
**And** the selection is saved to my estimate configuration

### Story 3.5: Proposal Generation
As a user,
I want to save my design as a formal proposal,
So that I can review it later or share it.

**Acceptance Criteria:**
**Given** I completed the estimate wizard
**When** I click "View Proposal"
**Then** a PDF-friendly summary page is generated
**And** the estimate is locked for a set period (e.g. 7 days)
**And** I can see the breakdown of costs

## Epic 4: Advisor Workflow & Proposals
**Goal:** Equip Design Advisors to manage leads, conduct site visits, verify conditions, and generate formal contracts.

### Story 4.1: Advisor Dashboard & Lead Queue
As a Design Advisor (DA),
I want to see a list of new estimate requests assigned to me,
So that I can prioritize my outreach.

**Acceptance Criteria:**
**Given** I log in as a DA
**When** I view my dashboard
**Then** I see a "New Leads" queue sorted by date
**And** I can click to view the customer's estimate details

### Story 4.2: Site Visit Scheduling
As a DA,
I want to schedule a site visit with the customer,
So that I can verify the project conditions.

**Acceptance Criteria:**
**Given** I am viewing a lead
**When** I select "Schedule Visit"
**Then** I can pick a date/time
**And** a calendar invite is sent to both me and the customer
**And** the estimate status updates to "Visit Scheduled"

### Story 4.3: Site Condition Verification
As a DA,
I want to update the estimate based on actual site measurements,
So that the final contract is accurate.

**Acceptance Criteria:**
**Given** I am at the site visit
**When** I edit the "Site Conditions" section of the estimate
**Then** I can adjust square footage and add constraints (e.g. "Sloped Terrain")
**And** the price recalculates automatically

### Story 4.4: Contract Generation
As a DA,
I want to generate a binding contract once the details are finalized,
So that the customer can sign and start the project.

**Acceptance Criteria:**
**Given** a verified estimate
**When** I click "Generate Contract"
**Then** a legal contract PDF is created with the final scope and price
**And** it is sent to the customer for digital signature

## Epic 5: Projects & Execution
**Goal:** Manage the active construction lifecycle from pre-construction through completion, including financial compliance.

### Story 5.1: Project Handoff & Setup
As a Project Manager (PM),
I want to receive a clean handoff from the DA,
So that I have all the info needed to start construction.

**Acceptance Criteria:**
**Given** a signed contract
**When** the project moves to "Construction" phase
**Then** a project record is created
**And** all files/photos from the estimate are copied to the project folder
**And** I am assigned as the PM

### Story 5.2: Construction Schedule
As a PM,
I want to create a timeline of tasks,
So that everyone knows what is happening when.

**Acceptance Criteria:**
**Given** an active project
**When** I add tasks to the schedule (e.g. "Demolition", "Framing")
**Then** they appear on a calendar view
**And** the customer can see the "Upcoming Work" on their dashboard

### Story 5.3: Daily Logs
As a Field Super,
I want to log daily progress and photos,
So that we have a record of work done.

**Acceptance Criteria:**
**Given** I am on the job site
**When** I submit a daily log
**Then** I can attach photos and text notes
**And** the logs are saved to the project history

### Story 5.4: Change Orders
As a PM,
I want to process changes to the scope formally,
So that costs are tracked accurately.

**Acceptance Criteria:**
**Given** a scope change is needed
**When** I create a Change Order
**Then** it must go through an approval workflow (Customer approval required)
**And** once approved, the contract value is updated

### Story 5.5: Invoicing & Payments
As a Finance Admin,
I want to issue invoices based on project milestones,
So that we get paid on time.

**Acceptance Criteria:**
**Given** a project milestone is met
**When** I generate an invoice
**Then** it is emailed to the customer
**And** they can pay via the portal
**And** the payment status updates automatically

## Epic 6: Communication & Reporting
**Goal:** Facilitate transparency through real-time messaging, centralized knowledge, and actionable business intelligence.

### Story 6.1: Project Messaging Center
As a user,
I want to message my project team within the app,
So that all communication is centralized.

**Acceptance Criteria:**
**Given** I am on the project page
**When** I open the messages tab
**Then** I can send text and photos to the team
**And** I receive email notifications for new messages

### Story 6.2: Internal vs External Notes
As a team member,
I want to post internal-only notes,
So that we can discuss issues privately.

**Acceptance Criteria:**
**Given** I am writing a message
**When** I toggle "Internal Only"
**Then** the customer cannot see the message
**And** it is marked clearly with a visual indicator for the team

### Story 6.3: RFI (Request for Information) Workflow
As a sub-contractor,
I want to formally ask a question about the plans,
So that I don't make mistakes.

**Acceptance Criteria:**
**Given** I have a question
**When** I submit an RFI
**Then** it is assigned to the PM
**And** it stays "Open" until officially answered

### Story 6.4: Customer Notifications
As a customer,
I want to be notified of important events,
So that I don't miss anything.

**Acceptance Criteria:**
**Given** a new invoice or schedule change
**When** the event occurs
**Then** I receive a push notification/email
**And** I can manage my notification preferences

## Epic 7: Warranty & Post-Completion
**Goal:** Manage long-term customer relationships through warranty claims and service requests.

### Story 7.1: Warranty Registration
As a user,
I want my warranty to start automatically when the project closes,
So that I know I am covered.

**Acceptance Criteria:**
**Given** a project is marked "Complete"
**When** the closeout process finishes
**Then** a Warranty record is active
**And** I can view the expiration date in my portal

### Story 7.2: Warranty Claim Submission
As a user,
I want to report an issue with my completed project,
So that it can be fixed.

**Acceptance Criteria:**
**Given** I have an active warranty
**When** I submit a claim with photos
**Then** a Warranty Ticket is created
**And** the Warranty Coordinator is notified

### Story 7.3: Claim Management
As a Warranty Coordinator,
I want to manage and schedule repairs for claims,
So that we honor our commitments efficiently.

**Acceptance Criteria:**
**Given** a new claim
**When** I review it
**Then** I can assign a technician or contractor
**And** track the status until "Resolved"
