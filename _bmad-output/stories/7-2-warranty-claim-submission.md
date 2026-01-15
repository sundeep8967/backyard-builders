# Story 7.2: Warranty Claim Submission

Status: in-progress

## Story
As a Customer (or Project Manager acting on their behalf),
I want to submit a warranty claim when an issue arises,
So that the construction team can assess and fix the defect.

## Acceptance Criteria
1. **Given** an Active Warranty **Then** show a "File Claim" button.
2. **Given** the Claim Form **Then** allow entering "Issue Title", "Description", and "Date Noticed".
3. **Given** a submitted claim **Then** track its status ("Submitted", "In Review", "Approved", "Repair Scheduled", "Completed").
4. **Given** the Warranty List **Then** display associated claims below the warranty policy.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `WarrantyClaim` interface (`id`, `warrantyId`, `title`, `description`, `status`, `createdAt`).
    - [ ] Add `claims` array to `Project` (or nested in `Warranty`). Let's put it on `Project` for flattened access, referencing `warrantyId`.
- [ ] Create UI Components
    - [ ] `components/admin/submit-claim-dialog.tsx`: Form.
    - [ ] Modify `components/admin/warranty-list.tsx`:
        - [ ] Add "File Claim" button to active warranties.
        - [ ] List existing claims for that warranty.

## Dev Notes
- Claims are linked to a specific warranty ID.
- Status flow: New -> In Review -> Action Taken.
