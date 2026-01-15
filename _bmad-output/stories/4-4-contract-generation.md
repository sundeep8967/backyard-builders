# Story 4.4: Contract Generation

Status: in-progress

## Story
As an Advisor,
I want to generate a formal contract for leads in the "Proposal" stage,
So that I can send it to the customer for digital signature.

## Acceptance Criteria
1. **Given** a lead in "Proposal" stage **Then** show a "Generate Contract" action in the `LeadDetailDialog` or card.
2. **Given** the action is clicked **Then** navigate to/open a Contract Preview.
3. **Given** the preview **Then** display customer info, final price (mocked), and legal terms.
4. **Given** a "Send to Customer" button **Then** show a success toast and update lead status to "Proposal Sent" (mocked).
5. **Given** a contract sent **Then** allow the customer (simulated) to view and sign it (Reuse Story 3.5 Proposal View logic).

## Tasks / Subtasks
- [ ] Create Contract Preview Component
    - [ ] Reuse `ProposalPage` (Story 3.5) logic but wrap it for Admin view? 
    - [ ] Actually, since we already built `dashboard/proposals/[id]` for the customer view, the Admin should just be able to "View" it and "Send" it.
    - [ ] Add "View Proposal" button to Admin Lead Dialog.
- [ ] Implement "Send" Logic
    - [ ] Mock email sending (Success Toast).
    - [ ] Update Lead Status to "proposal" (if not already).
- [ ] Integration
    - [ ] Link `LeadDetailDialog` to the proposal view.

## Dev Notes
- We will link the "Proposal" stage leads to the existing `/dashboard/proposals/demo` page for MVP, passing the lead status as context.
- The "Generate Contract" action will simulate creating that proposal instance.
