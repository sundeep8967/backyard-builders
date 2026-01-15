# Story 3.5: Proposal Generation & View

Status: in-progress

## Story
As a user,
I want to view a professional "Proposal" generated from my estimate,
So that I can see a consolidated view of my project costs, timeline, and terms before signing.

## Acceptance Criteria
1. **Given** a detailed estimate **Then** generate a proposal view (`/dashboard/proposals/[id]`).
2. **Given** multiple line items **Then** show them grouped with detailed descriptions (Service, Material, Color, Pattern).
3. **Given** a total cost **Then** show a breakdown including tax (mocked) and deposit required.
4. **Given** a "Accept Proposal" button **Then** show a success dialog and update status (mocked).
5. **Given** a "Print" action **Then** trigger browser print dialog with a clean print stylesheet.

## Tasks / Subtasks
- [ ] Create Proposal Data Model (Mock)
    - [ ] Define interface `Proposal`
    - [ ] Create sample proposal generator based on cart items
- [ ] Create Proposal Page
    - [ ] Create `app/(dashboard)/dashboard/proposals/[id]/page.tsx`
    - [ ] Header with company branding
    - [ ] Line item table
    - [ ] Terms & Conditions section
- [ ] Implement Actions
    - [ ] "Sign & Accept" (Dialog with signature input)
    - [ ] "Print / Download PDF" (CSS print media query)

## Dev Notes
- For MVP, we will generate the proposal ID dynamically from the cart items passed via query params or session storage, specifically for the demo flow.
- "Signing" will just be a text input for their name.
