# Story 5.1: Project Handoff & Setup

Status: in-progress

## Story
As an Admin/Project Manager,
I want to convert a "Won" lead into an active Project,
So that I can begin managing the construction phase (schedule, logs, etc.).

## Acceptance Criteria
1. **Given** a lead in "Won" stage **Then** show a "Create Project" action in the `LeadDetailDialog`.
2. **Given** the action is clicked **Then** create a new `Project` record (mocked).
    - Copy: Customer Name, Project Type, Address (if we had it, use mock), Budget.
    - Set Status: "Planning".
    - Set Start Date: TBD.
3. **Given** the project is created **Then** navigate the user to the new **Project Dashboard** (`/admin/projects/[id]`).
4. **Given** the Project Dashboard **Then** show the project header/summary to confirm creation.

## Tasks / Subtasks
- [ ] Create Data Models
    - [ ] Create `lib/admin/projects.ts` with `Project` interface and `MOCK_PROJECTS`.
- [ ] Implement Handoff Logic
    - [ ] Update `LeadDetailDialog` with "Create Project" button (only for "Won" leads).
    - [ ] Mock function to "convert" Lead -> Project.
- [ ] Create Project Dashboard Shell
    - [ ] Create `app/(admin)/admin/projects/[id]/page.tsx`.
    - [ ] Display basic project info (Name, Status, Budget).

## Dev Notes
- We will assume a 1:1 mapping for Lead -> Project for now.
- The Project Dashboard will be the hub for Epic 5 features (Schedule, Daily Logs).
