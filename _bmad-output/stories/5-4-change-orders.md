# Story 5.4: Change Orders

Status: in-progress

## Story
As a Project Manager,
I want to create and manage change orders,
So that I can track additional work and costs outside the original scope.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** show a "Change Orders" section (or tab).
2. **Given** a "Create Change Order" action **Then** open a form to enter:
    - Title/Description
    - Cost Impact (+/-)
    - Schedule Impact (days)
3. **Given** a submitted change order **Then** display it in the list with a status (Draft, Sent, Approved, Rejected).
4. **Given** an "Approved" change order **Then** update the Total Project Budget (mocked logic).

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `ChangeOrder` interface (`id`, `title`, `cost`, `status`, `date`).
    - [ ] Add `changeOrders` list to `Project`.
- [ ] Create UI Components
    - [ ] `components/admin/change-order-list.tsx`: List view.
    - [ ] `components/admin/create-change-order-dialog.tsx`: Creation form.
- [ ] Integration
    - [ ] Add "New Change Order" button.
    - [ ] Integrate components into Project Dashboard.

## Dev Notes
- For MVP, we will just list them card-style.
- Status flow: Draft -> Approved (Immediate for admin) or Sent (if we were building customer facing). Let's stick to "Pending Approval" / "Approved".
