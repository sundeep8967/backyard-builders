# Story 7.3: Claim Management

Status: in-progress

## Story
As an Admin,
I want to manage warranty claims by updating their status and adding resolution notes,
So that I can track the progress of repairs and communicate with the customer.

## Acceptance Criteria
1. **Given** a list of active claims **Then** allow clicking on a claim to manage it.
2. **Given** the Manage Claim dialog **Then** show current details (Issue, Description).
3. **Given** the dialog **Then** allow changing the status ("In Review", "Repair Scheduled", "Completed", "Rejected").
4. **Given** a status update **Then** reflected the new status in the Warranty List.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `resolutionNotes` field to `WarrantyClaim` (optional string).
- [ ] Create UI Components
    - [ ] `components/admin/manage-claim-dialog.tsx`: View details, update status/notes.
- [ ] Integration
    - [ ] Update `WarrantyList` to make claims clickable.
    - [ ] Add `ManageClaimDialog` to Dashboard.

## Dev Notes
- Reuse existing status enum.
