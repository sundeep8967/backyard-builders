# Story 5.5: Invoicing & Payments

Status: in-progress

## Story
As a Project Manager,
I want to generate and track invoices for project milestones and change orders,
So that I can ensure timely payment and cash flow.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** show an "Invoicing" section.
2. **Given** a "Create Invoice" action **Then** allow creating an invoice:
    - Linked to a specific Phase or Change Order (optional).
    - Amount, Due Date, Notes.
3. **Given** an invoice **Then** track status: "Draft", "Sent", "Paid", "Overdue".
4. **Given** a list of invoices **Then** display Total Billed and Total Paid summary.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `Invoice` interface.
    - [ ] Add `invoices` array to `Project`.
- [ ] Create UI Components
    - [ ] `components/admin/invoice-list.tsx`: List/Table of invoices.
    - [ ] `components/admin/create-invoice-dialog.tsx`: Form to generate invoice.
- [ ] Integration
    - [ ] Add to Project Dashboard.

## Dev Notes
- We will mock the "Send" and "Pay" actions with simple state updates.
- No actual PDF generation functionality for this MVP step, just tracking records.
