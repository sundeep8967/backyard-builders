# Story 6.3: RFI Workflow

Status: in-progress

## Story
As a Project Manager,
I want to formally issue Requests for Information (RFIs) to the client or team,
So that I can get specific answers to blockers and track them until resolved.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** show an "RFIs" section.
2. **Given** a "Create RFI" action **Then** allow entering a Question and Due Date.
3. **Given** an RFI **Then** track status: "Open", "Answered", "Closed".
4. **Given** an Answered RFI **Then** allow the PM to mark it as "Closed" (accepted).

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `RFI` interface (`id`, `question`, `answer`, `status`, `dueDate`, `createdAt`).
    - [ ] Add `rfis` array to `Project`.
- [ ] Create UI Components
    - [ ] `components/admin/rfi-list.tsx`: List RFIs with visual status indicators.
    - [ ] `components/admin/create-rfi-dialog.tsx`: Form to creation.
- [ ] Integration
    - [ ] Add "RFIs" section to Project Dashboard.

## Dev Notes
- For this MVP, we will simulate the "Customer Answering" by just allowing the Admin to edit the answer field or "Simulate Reply".
- Focus is on the tracking aspect: "We are waiting on X".
