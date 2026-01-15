# Story 5.2: Construction Schedule

Status: in-progress

## Story
As a Project Manager,
I want to view and manage the construction schedule (Gantt or List view),
So that I can track phases (Demolition, Foundation, Build, Finish) and dependencies.

## Acceptance Criteria
1. **Given** the Project Dashboard **Then** display a "Construction Schedule" section.
2. **Given** a new project **Then** populate it with a default "Standard Template" of phases:
    - Prep & Demo
    - Foundation / Grading
    - Structure / Hardscape
    - Finishes & Cleanup
3. **Given** a phase **Then** display Start Date, End Date, and Status (Not Started, In Progress, Done).
4. **Given** a phase **Then** allow editing the dates and status.

## Tasks / Subtasks
- [ ] Update Data Model
    - [ ] Add `ProjectPhase` interface and `phases` array to `Project` in `projects.ts`.
- [ ] Create UI Components
    - [ ] `components/admin/project-schedule.tsx`: Displays list/timeline of phases.
    - [ ] Date picker integration for editing.
- [ ] Integration
    - [ ] Embed `ProjectSchedule` into `ProjectDashboardPage`.
    - [ ] Mock saving updates to phases.

## Dev Notes
- For MVP, we'll use a simple list of phase cards with date pickers.
- We will mock the "Template" by just initializing `MOCK_PROJECTS` with these phases.
