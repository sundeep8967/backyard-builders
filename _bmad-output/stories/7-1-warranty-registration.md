# Story 7.1: Warranty Registration

Status: in-progress

## Story
As a Project Manager,
I want to register a warranty for a completed project,
So that the customer knows their coverage period and we can track it.

## Acceptance Criteria
1. **Given** a completed project **Then** show a "Warranty" section/tab.
2. **Given** no active warranty **Then** show a "Register Warranty" button.
3. **Given** the registration form **Then** allow entering "Start Date", "End Date", "Coverage Details" (e.g. Structural, Workmanship).
4. **Given** a registered warranty **Then** display the coverage status ("Active", "Expired") and dates.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `Warranty` interface (`id`, `startDate`, `endDate`, `coverageType`, `description`, `status`).
    - [ ] Add `warranty` object to `Project` (1-to-1 relationship usually, or array if multiple policies). Let's do `warranty: Warranty` for simplicity or `warranties: Warranty[]` if we want separate structural/cosmetic. Let's go with `warranties: Warranty[]` to be flexible.
- [ ] Create UI Components
    - [ ] `components/admin/warranty-list.tsx`: Display active warranties.
    - [ ] `components/admin/register-warranty-dialog.tsx`: Form to add warranty.
- [ ] Integration
    - [ ] Add "Warranty" section to Dashboard (maybe a new Tab or Card).

## Dev Notes
- Logic: Status is derived from dates (Active vs Expired), but we can also store it for ease.
- Mock data should include one project with an active warranty.
